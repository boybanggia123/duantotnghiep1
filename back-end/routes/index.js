const functions = require("firebase-functions");
const express = require("express");
const bcrypt = require("bcrypt");
var router = express.Router();

//Imort model

const cors = require("cors");
const app = express();

app.use(cors());
const connectDb = require("../model/db");
const { ObjectId } = require("mongodb");
//Lấy tất cả sản phẩm dạng json

router.get("/products", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");
  const products = await productCollection.find().toArray();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});
//lấy sản phẩm hot
router.get("/hot", async (req, res, next) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection("products");

    const products = await productCollection
      .find({ hot: true })
      .limit(4)
      .toArray();

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm hot" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    next(error);
  }
});
// lấy sản phẩm mới
router.get("/new", async (req, res, next) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection("products");

    // Lấy ngày hiện tại và ngày cách đây 30 ngày
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - 30);

    // Tìm các sản phẩm có `dayadd` nằm trong khoảng 30 ngày gần đây
    const products = await productCollection
      .find({ dayadd: { $gte: pastDate } })

      .toArray();

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm mới" });
    }
  } catch (error) {
    console.error("Error fetching new products:", error);
    next(error);
  }
});

// Lấy danh sách danh mục
router.get("/categories", async (req, res, next) => {
  try {
    const db = await connectDb(); // Sử dụng connectDb để kết nối với cơ sở dữ liệu
    const categoryCollection = db.collection("categories");
    const categories = await categoryCollection.find().toArray();
    if (categories.length > 0) {
      res.status(200).json(categories);
    } else {
      res.status(404).json({ message: "Không có danh mục nào" });
    }
  } catch (error) {
    next(error);
  }
});

//Lấy danh mục taikhoan
router.get("/users", async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection("users");
  const users = await userCollection.find().toArray();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});
//Kiểm tra token qua Bearer
router.get("/checktoken", async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "secret", (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    res.status(200).json({ message: "Token hợp lệ" });
  });
});

//lấy chi tiết 1 sản phẩm
router.get("/productdetail/:id", async (req, res, next) => {
  let id = new ObjectId(req.params.id);
  const db = await connectDb();
  const productCollection = db.collection("products");
  const product = await productCollection.findOne({ _id: id });
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});



// Đăng ký
router.post("/register", async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection("users");
  const { fullname, phone, email, password } = req.body;
  const user = await userCollection.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email đã tồn tại" });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = {
      fullname,
      phone,
      email,
      password: hashPassword,
      role: "user",
    };
    try {
      const result = await userCollection.insertOne(newUser);
      if (result.insertedId) {
        res.status(200).json({ message: "Đăng ký thành công" });
      } else {
        res.status(500).json({ message: "Đăng ký thất bại" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
    }
  }
});

// Đăng nhập
const jwt = require("jsonwebtoken");
router.post("/login", async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection("users");
  const { email, password } = req.body;
  const user = await userCollection.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email không tồn tại" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Mật khẩu không chính xác" });
  }
  const token = jwt.sign(
    { id: user._id,email: user.email, role: user.role, fullname: user.fullname },
    "secret",
    {
      expiresIn: "1h",
    }
  );
  res.status(200).json({ token });
});

//lấy thông tin chi tiết user qua token
router.get("/detailuser", async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "secret", async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    const db = await connectDb();
    const userCollection = db.collection("users");
    const userInfo = await userCollection.findOne({ email: user.email });
    if (userInfo) {
      res.status(200).json(userInfo);
    } else {
      res.status(404).json({ message: "Không tìm thấy user" });
    }
  });
});

const multer = require("multer");
//Thiết lập nơi lưu trữ và tên file
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
//Kiểm tra file upload
function checkFileUpLoad(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return cb(new Error("Bạn chỉ được upload file ảnh"));
  }
  cb(null, true);
}
//Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });

router.put("/updateuser", upload.single("avatar"), async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "quandz47", async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }

    const db = await connectDb();
    const userCollection = db.collection("users");
    const { fullname, phone, address, gender, dateOfBirth } = req.body; // Thêm các trường cần cập nhật
    const updateData = {
      fullname,
      phone,
      email,
      address,
      avatar,
      role,
      createdAt,
      gender,
      dateOfBirth,
    };

    // Nếu có avatar mới, thêm vào dữ liệu cập nhật
    if (req.file) {
      updateData.avatar = req.file.filename; // Lưu tên file ảnh
    }

    const result = await userCollection.updateOne(
      { email: user.email },
      { $set: updateData }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Cập nhật thông tin thành công" });
    } else {
      res.status(500).json({ message: "Cập nhật thất bại" });
    }
  });
}); // checkout
router.post("/orders", async (req, res) => {
  try {
    const {
      _id,
      customerEmail,
      customerPhone,
      customerAddress,
      totalAmount,
      paymentMethod,
    } = req.body;

    const newOrder = new Order({
      _id,
      customerEmail,
      customerPhone,
      customerAddress,
      totalAmount,
      paymentMethod,
      status: "pending",
      condition: "processing",
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Đơn hàng đã được tạo thành công", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

module.exports = router;
