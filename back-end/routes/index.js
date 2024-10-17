var express = require("express");
var router = express.Router();

//Imort model
const connectDb = require("../model/db");
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

module.exports = router;
