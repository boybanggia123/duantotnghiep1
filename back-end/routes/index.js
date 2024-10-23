var express = require("express");
var router = express.Router();

//Imort model
const cors = require('cors');
const app = express();

app.use(cors())
const connectDb=require('../model/db');
const { ObjectId } = require('mongodb');
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

module.exports = router;
