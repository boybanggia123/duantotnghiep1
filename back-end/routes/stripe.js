  const express = require("express");
  const app = express();
  const mongoose = require('mongoose');
  const jwt = require("jsonwebtoken");
  const Stripe = require("stripe");
  const bcrypt = require("bcryptjs"); 
  require("dotenv").config();
  const Bill = require("../model/bill")
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
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

    const customer = await stripe.customers.create({
      metadata: {
        userId: req.body.userId, 
        cart: JSON.stringify(
          req.body.cartItems.map(item => ({
            id: item._id,
            name: item.name,
            description: item.description,
            price: item.price,
            images: item.image,
            size: item.size,
            quantity: item.quantity
          }))
        )
        
      
        }
      
    },
   

  );
   
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

    

    const couponId = req.body.couponId;

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
router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType;
  if(endpointSecret){
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhooks đã được gửi");
      
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the event
  if(eventType === "checkout.session.completed"){
    stripe.customers.retrieve(data.customer)
      .then((customer) => {
        console.log("Retrieved customer:", customer); 
        console.log("Data from session:", JSON.stringify(data, null, 2));
        const discountAmount = data.total_details?.amount_discount || 0;
       const couponId = data.discounts?.[0]?.coupon?.id || null;
       console.log("Discount amount:", discountAmount);
       console.log("Coupon ID:", couponId);
        createBill(customer, data,couponId,discountAmount);
      })
      .catch((err) => console.log(err.message));
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
});






  module.exports = router;
