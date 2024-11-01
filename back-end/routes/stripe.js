const express = require("express");
const app = express();
const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
app.use(express.static("."));
app.use(express.json());

var router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
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
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });
  
  res.send({ url: session.url });
});


module.exports = router;
