const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    customeId: { type: String }, 
    paymentIntentId: { type: String }, 
    products: [{ 
        name: { type: String }, 
        description: { type: String }, 
        price: { type: Number }, 
        image: { type: String }, 
        size: { type: String }, 
        cartQuantity: { type: Number }, 
    }],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    discount: { type: Number, default: 0 }, 
    couponId: { type: String, default: null },
    shipping: { type: Object, required: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true }, 
    
}, { timestamps: true });


const Bill = mongoose.model('bills', billSchema);
module.exports = Bill;