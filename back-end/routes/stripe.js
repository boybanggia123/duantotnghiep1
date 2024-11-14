const express = require("express");
const app = express();
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Stripe = require("stripe");
const bcrypt = require("bcryptjs"); 
require("dotenv").config();
const Bill = require("../model/bill")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { ObjectId } = require("mongodb");
const connectDb = require("../model/db");
app.use(express.static("."));
app.use(express.json());

var router = express.Router();

(async () => {
  try {
      const db = await connectDb(); // Kết nối đến MongoDB
      console.log("Kết nối đến cơ sở dữ liệu thành công");
  } catch (error) {
      console.error("Kết nối đến cơ sở dữ liệu thất bại:", error);
  }
})();


router.post("/create-checkout-session", async (req, res) => {
  const { userId, couponId } = req.body;

  // Kết nối cơ sở dữ liệu
  const db = await connectDb();
  const cartCollection = db.collection("cart");

  // Lấy giỏ hàng của người dùng từ MongoDB
  const userCart = await cartCollection.findOne({ userId: new ObjectId(userId) });

  if (!userCart || userCart.items.length === 0) {
    return res.status(404).json({ message: "Giỏ hàng trống" });
  }

  const customer = await stripe.customers.create({
    metadata: {
      userId: userId,
      cart: JSON.stringify(
        userCart.items.map(item => ({
          id: item.productId,
          name: item.name,
          description: item.description,
          price: item.price,
          images: item.image,
          size: item.size,
          quantity: item.quantity,
        }))
      ),
    },
  });
 
  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd", // Ensure this matches the shipping options
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.description,
          metadata: {
            id: item._id,
            size: item.size,
          },
        },
        unit_amount: item.price * 100, // Price in cents
      },
      quantity: item.quantity,
    };
  });

  

  

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["US", "VN"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd", // Match this currency
          },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd", // Ensure this is also USD
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    customer : customer.id,
    line_items,
    mode: "payment",
    discounts: couponId ? [{ coupon: couponId }] : [], 
    success_url: `${process.env.CLIENT_URL}/checkout`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });


 
  res.send({ url: session.url });



});

// Create bill
const createBill = async (customer,data,couponId,discountAmount ) => {
const Items = JSON.parse(customer.metadata.cart);


const newBill = new Bill({
  userId: new mongoose.Types.ObjectId(customer.metadata.userId),
  customeId:data.customer,
  paymentIntentId:data.payment_intent,
  products:Items,
  subtotal:data.amount_subtotal,
  total: data.amount_total,
  discount: discountAmount, 
  couponId: couponId, 
  shipping: data.customer_details,
  payment_status:data.payment_status,
 
});
try{
  const saveBill = await  newBill.save()
  console.log("save bill:",saveBill);
  
}catch(err){
  console.error("Error saving bill:", err);
  
}
}

// stripe webhooks


let endpointSecret ;
// endpointSecret = "whsec_2012e3ef93473c4aff8dd580bc089e5cb45645845400148bed33242726171cf3";
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType;
  if (endpointSecret) {
    try {
      const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhook verified successfully");
      data = event.data.object;
      eventType = event.type;
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Xử lý sự kiện "checkout.session.completed"
  if (eventType === "checkout.session.completed") {
    try {
      // Lấy thông tin khách hàng từ Stripe
      const customer = await stripe.customers.retrieve(data.customer);
      console.log("Retrieved customer:", customer);
      console.log("Session data:", JSON.stringify(data, null, 2));

      // Lấy metadata từ phiên thanh toán
      const userId = customer.metadata.userId;

      // Kết nối tới MongoDB
      const db = await connectDb();
      const cartCollection = db.collection("cart");

      // Xóa giỏ hàng của người dùng
      const result = await cartCollection.deleteOne({ userId: new ObjectId(userId) });

      if (result.deletedCount > 0) {
        console.log(`Cart for user ${userId} has been deleted successfully`);
      } else {
        console.warn(`No cart found for user ${userId}`);
      }

      // (Tùy chọn) Gọi hàm `createBill` để tạo hóa đơn
      const discountAmount = data.total_details?.amount_discount || 0;
      const couponId = data.discounts?.[0]?.coupon?.id || null;
      createBill(customer, data, couponId, discountAmount);
    } catch (err) {
      console.error("Error processing checkout.session.completed:", err.message);
    }
  }

  // Trả về trạng thái 200 để Stripe biết webhook đã được xử lý
  res.status(200).end();
});



// --------------------------------------------------------------- Hiển Thị hóa đơn của người dùng

router.get("/orderuser/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const db = await connectDb(); 
    const ordersCollection = db.collection("bills");
    const orders = await ordersCollection.find({ userId: new ObjectId(userId) }).toArray();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/orders/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const db = await connectDb(); 
    const ordersCollection = db.collection("bills");
    const order = await ordersCollection.findOne({ _id: new ObjectId(orderId) });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ message: "Server error" });
  }
});





module.exports = router;