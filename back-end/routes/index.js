var express = require("express");
var router = express.Router();

//Imort model
const cors = require('cors');
const app = express();

app.use(cors())
const connectDb=require('../model/db');
const { ObjectId } = require('mongodb');
const bcrypt = require("bcryptjs");
const multer = require("multer");

//Thiết lập nơi lưu trữ và tên file
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img')
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
router.get('/categories', async (req, res, next) => {
  try {
    const db = await connectDb();  // Sử dụng connectDb để kết nối với cơ sở dữ liệu
    const categoryCollection = db.collection('categories');
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
router.get('/users', async(req, res, next)=> {
  const db=await connectDb();
  const userCollection=db.collection('users');
  const users=await userCollection.find().toArray();
  if(users){
    res.status(200).json(users);
  }else{
    res.status(404).json({message : "Không tìm thấy"})
  }
}
);
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
//Kiểm tra token qua Bearer
router.get('/checktoken', async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'secret', (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    res.status(200).json({ message: "Token hợp lệ" });
  }
  );
}
);

//lấy chi tiết 1 sản phẩm
router.get('/productdetail/:id', async(req, res, next)=> {
  let id = new ObjectId(req.params.id);
  const db = await connectDb();
  const productCollection = db.collection('products');
  const product = await productCollection.findOne({_id:id});
  if(product){
    res.status(200).json(product);
  }else{
    res.status(404).json({message : "Không tìm thấy"})
  }
}
);

//lấy chi tiết 1 tài khoản
router.get('/userdetail/:id', async(req, res, next)=> {
  let id = new ObjectId(req.params.id);
  const db = await connectDb();
  const userCollection = db.collection('users');
  const user = await userCollection.findOne({_id:id});
  if(user){
    res.status(200).json(user);
  }else{
    res.status(404).json({message : "Không tìm thấy"})
  }
}
);

// Sửa tài khoản
router.put('/updateuser/:id', upload.single('img'), async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection('users');
  const id = new ObjectId(req.params.id);

  try {
    // Lấy thông tin tài khoản hiện tại từ database
    const existingUser = await userCollection.findOne({ _id: id });
    if (!existingUser) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }

    // Chuẩn bị đối tượng updateduser với dữ liệu mới hoặc dữ liệu cũ nếu không có dữ liệu mới
    const { fullname, email, phone, address, createdAt, role, dateOfBirth, password } = req.body;
    let updateduser = {
      avatar: existingUser.avatar,
      fullname: fullname || existingUser.fullname,
      email: email || existingUser.email,
      phone: phone || existingUser.phone,
      address: address || existingUser.address,
      createdAt: createdAt || existingUser.createdAt,
      role: role || existingUser.role,
      dateOfBirth: dateOfBirth || existingUser.dateOfBirth,
      password: password || existingUser.password
    };

    // Cập nhật ảnh avatar nếu có file mới
    if (req.file) {
      updateduser.avatar = req.file.originalname;
    }

    // Thực hiện cập nhật vào database
    const result = await userCollection.updateOne({ _id: id }, { $set: updateduser });
    if (result.matchedCount) {
      res.status(200).json({ message: "Sửa tài khoản thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

// Thêm tài khoản
router.post("/adduser", upload.single('avatar'), async (req, res) => {
  const db = await connectDb();
  const userCollection = db.collection("users");
  const { fullname, email, phone, address, createdAt, role, dateOfBirth, password } = req.body;
  // Kiểm tra và cập nhật avatar nếu có file được tải lên
  let avatar = req.file ? req.file.filename : null; // Sử dụng filename để lưu vào DB
  try {
    const user = await userCollection.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = {
      avatar,
      fullname,
      email,
      phone,
      address,
      createdAt,
      role: role || "user", // Mặc định là "user" nếu không có role
      dateOfBirth,
      password: hashPassword,
    };

    // Thêm người dùng vào cơ sở dữ liệu
    const result = await userCollection.insertOne(newUser);
    if (result.insertedId) {
      res.status(200).json({ message: "Thêm tài khoản thành công" });
    } else {
      res.status(500).json({ message: "Thêm tài khoản thất bại" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
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
    { email: user.email, role: user.role, fullname: user.fullname },
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



//orders
//thêm đơn hàng
router.post('/order', async(req, res, next)=> {
  const db = await connectDb();
  const orderCollection = db.collection('orders');
  const data = req.body;
  const result = await orderCollection.insertOne(data);
  if(result.insertedId){
    res.status(200).json(result);
  }else{
    res.status(404).json({message : "Không tìm thấy"})
  }
});



// Route để lấy danh sách đơn hàng
router.get('/order', async (req, res, next) => {
  try {
      const db = await connectDb();
      const orderCollection = db.collection('orders');
      const orders = await orderCollection.find().toArray(); // Lấy tất cả đơn hàng từ collection
      
      res.status(200).json(orders);
  } catch (error) {
      next(error); // Chuyển lỗi đến middleware xử lý lỗi
  }
});


// Route để xóa đơn hàng
router.delete('/order/:id', async (req, res, next) => {
  try {
    const db = await connectDb();
    const orderCollection = db.collection('orders');
    const orderId = req.params.id; // Lấy ID đơn hàng từ URL

    // Xóa đơn hàng khỏi collection
    const result = await orderCollection.deleteOne({ _id: new ObjectId(orderId) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Đơn hàng đã được xóa thành công." });
    } else {
      res.status(404).json({ message: "Không tìm thấy đơn hàng để xóa." });
    }
  } catch (error) {
    next(error); // Chuyển lỗi đến middleware xử lý lỗi
  }
});


// Route để xác nhận đơn hàng
router.put('/order/:id/confirm', async (req, res, next) => {
  try {
    const db = await connectDb();
    const orderCollection = db.collection('orders');
    const orderId = req.params.id; // Lấy ID đơn hàng từ URL

    // Cập nhật trạng thái đơn hàng thành đã xác nhận
    const result = await orderCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status: "Đã xác nhận" } } // Thay đổi trạng thái ở đây
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "Đơn hàng đã được xác nhận thành công." });
    } else {
      res.status(404).json({ message: "Không tìm thấy đơn hàng để xác nhận." });
    }
  } catch (error) {
    next(error); // Chuyển lỗi đến middleware xử lý lỗi
  }
});



// Route để xóa đơn hàng
router.delete('/order/:id', async (req, res, next) => {
  try {
    const db = await connectDb();
    const orderCollection = db.collection('orders');
    const orderId = req.params.id; // Lấy ID đơn hàng từ URL

    // Xóa đơn hàng khỏi collection
    const result = await orderCollection.deleteOne({ _id: new ObjectId(orderId) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Đơn hàng đã được xóa thành công." });
    } else {
      res.status(404).json({ message: "Không tìm thấy đơn hàng để xóa." });
    }
  } catch (error) {
    next(error); // Chuyển lỗi đến middleware xử lý lỗi
  }
});


// Route để xác nhận đơn hàng
router.put('/order/:id/confirm', async (req, res, next) => {
  try {
    const db = await connectDb();
    const orderCollection = db.collection('orders');
    const orderId = req.params.id; // Lấy ID đơn hàng từ URL

    // Cập nhật trạng thái đơn hàng thành đã xác nhận
    const result = await orderCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status: "Đã xác nhận" } } // Thay đổi trạng thái ở đây
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "Đơn hàng đã được xác nhận thành công." });
    } else {
      res.status(404).json({ message: "Không tìm thấy đơn hàng để xác nhận." });
    }
  } catch (error) {
    next(error); // Chuyển lỗi đến middleware xử lý lỗi
  }
});


// checkout
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
      res.status(404).json({ message: 'Không tìm thấy' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
