const functions = require("firebase-functions");
const express = require("express");
var router = express.Router();
const cors = require("cors");
const app = express();
app.use(cors());
const nodemailer = require("nodemailer");
const connectDb = require("../model/db");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const multer = require('multer');
const crypto = require('crypto');

//-----------------------------------------------Upload img--------------------------------------------------------
//Thiết lập nơi lưu trữ và tên file
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
//Kiểm tra file upload
function checkFileUpLoad(req, file, cb){
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)){
    return cb(new Error('Bạn chỉ được upload file ảnh'));
  }
  cb(null, true);
  }
  //Upload file
  let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });
//-----------------------------------------------end Upload img--------------------------------------------------------

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
// tìm kiếm sản phẩm 
router.get('/search', async function (req, res, next) {
  try {
    const searchKey = req.query.key;
    if (!searchKey) {
      return res.status(400).json({ message: 'Search key is required' });
    }
    const db = await connectDb();
    const productCollection = db.collection('products');
    const regex = new RegExp(searchKey, 'i');
    const products = await productCollection
      .find({
        $or: [{ name: { $regex: regex } }, { description: { $regex: regex } }],
      })
      .toArray();

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'No products found' });
    }
  } catch (error) {
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
// lấy sản phẩm theo danh mục
router.get("/products/:categoryId", async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const db = await connectDb();
    const productCollection = db.collection("products");
    const query = { categoryId: ObjectId.isValid(categoryId) ? new ObjectId(categoryId) : categoryId };
    const products = await productCollection.find(query).toArray();
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm cho danh mục này" });
    }
  } catch (error) {
    console.error("Error fetching products by categoryId:", error);
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

// ----------------------------------------------USER--------------------------------------------------------------

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

// ----------------------------------------------Quên mật khẩu--------------------------------------------------------------//

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fashionverse112@gmail.com",  // Thay bằng email của bạn
    pass: "xczyubpahutsqivm",   // Mật khẩu email của bạn
  },
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  console.log("Email nhận được từ client:", email);

  // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu không
  const db = await connectDb();
  const userCollection = db.collection("users");
  const user = await userCollection.findOne({ email });
  console.log(user);

  if (!user) {
    return res.status(404).json({ message: "Email không tồn tại" });
  }

  // Tạo mã OTP (hoặc token để bảo mật)
  const otp = Math.floor(100000 + Math.random() * 900000);  // Mã OTP 6 chữ số

  // Gửi mã OTP qua email
  const mailOptions = {
    from: "fashionverse112@gmail.com",
    to: email,
    subject: "Mã OTP đặt lại mật khẩu",
    html: `<p>Mã OTP của bạn là: <strong>${otp}</strong></p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
      return res.status(500).json({ message: "Có lỗi xảy ra khi gửi email" });
    } else {
      // Lưu mã OTP tạm thời trong cơ sở dữ liệu hoặc bộ nhớ tạm
      // Ví dụ: bạn có thể lưu trong một bảng riêng hoặc bộ nhớ tạm để so sánh khi người dùng nhập mã
      userCollection.updateOne({ email }, { $set: { otp } });

      res.status(200).json({ message: "Mã OTP đã được gửi đến email của bạn" });
    }
  });
});


// Endpoint kiểm tra mã OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu không
  const db = await connectDb();
  const userCollection = db.collection("users");
  const user = await userCollection.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "Email không tồn tại" });
  }

  // Kiểm tra mã OTP
  if (user.otp !== parseInt(otp, 10)) {
    return res.status(400).json({ message: "Mã OTP không chính xác" });
  }

  // Nếu mã OTP hợp lệ, cho phép thay đổi mật khẩu
  res.status(200).json({ message: "Mã OTP hợp lệ. Bạn có thể thay đổi mật khẩu." });
});

// Endpoint thay đổi mật khẩu
router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu không
  const db = await connectDb();
  const userCollection = db.collection("users");
  const user = await userCollection.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "Email không tồn tại" });
  }

  // Mã hóa mật khẩu mới trước khi lưu vào cơ sở dữ liệu
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Cập nhật mật khẩu mới cho người dùng
  await userCollection.updateOne({ email }, { $set: { password: hashedPassword, otp: null } });

  res.status(200).json({ message: "Mật khẩu đã được thay đổi thành công" });
});




// ----------------------------------------------Quên mật khẩu--------------------------------------------------------------//

//Thiết lập nơi lưu trữ và tên file




router.put("/updateuser", upload.single("avatar"), async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token không được cung cấp" });
    }

    jwt.verify(token, "secret", async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token không hợp lệ" });
      }

      const { fullname, email, phone, address, dateOfBirth, password, role } = req.body;
      const avatar = req.file ? req.file.path : null;

      if (!fullname || !email || !password) {
        return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin bắt buộc" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = {
        avatar,
        fullname,
        email,
        phone,
        address,
        dateOfBirth,
        role: role || "user",
        password: hashPassword,
        createdAt: new Date(),
      };

      const result = await userCollection.insertOne(newUser);
      if (result.insertedId) {
        res.status(200).json({ message: "Thêm tài khoản thành công" });
      } else {
        res.status(500).json({ message: "Thêm tài khoản thất bại" });
      }
    });
  } catch (error) {
    console.error("Lỗi trong API updateuser:", error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});


//xoa user
router.delete('/deleteuser/:id', async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection('users');
  const id = new ObjectId(req.params.id);
  try {
    const result = await userCollection.deleteOne({ _id: id });
    if (result.deletedCount) {
      res.status(200).json({ message: "Xóa tài khoản thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

// ----------------------------------------------END USER--------------------------------------------------------------


// ----------------------------------------------START USERINFO--------------------------------------------------------------

router.put("/user/update", upload.single("avatar"), async (req, res) => {
  try {
    // Lấy token từ header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token không được cung cấp" });
    }

    // Xác thực token
    jwt.verify(token, "secret", async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token không hợp lệ" });
      }

      const userId = decoded.id;
      const { fullname, email, phone, address, gender, dateOfBirth } = req.body;

      const avatar = req.file ? req.file.path : currentUser.avatar;


      const updatedData = {

        fullname,
        email,
        phone,
        address,
        gender,
        dateOfBirth,
        avatar,
        createdAt: new Date(),
      };
    
      

      const db = await connectDb();

      // Cập nhật người dùng trong MongoDB sử dụng native driver
      const result = await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },  // Chuyển userId thành ObjectId
        { $set: updatedData }
      );

      if (result.modifiedCount > 0) {
        const avatarUrl = avatar ? `http://localhost:3000/${avatar}` : undefined;
        return res.status(200).json({
          message: "Cập nhật thông tin thành công",
          avatarUrl: avatarUrl,  // Trả về URL của avatar
        });
      } else {
        return res.status(400).json({ message: "Không có thay đổi nào được thực hiện" });
      }
    });
  } catch (error) {
    console.error("Lỗi trong API update user:", error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});


// ----------------------------------------------END USERINFO--------------------------------------------------------------

module.exports = router;
