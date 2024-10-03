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
//Lấy danh sách sản phẩm theo idcate
router.get("/productbycate/:idcate", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");
  const products = await productCollection
    .find({ categoryId: req.params.idcate })
    .toArray();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});

module.exports = router;
