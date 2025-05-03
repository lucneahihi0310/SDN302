const mongoose = require('mongoose');
const Product = require('./product.model');
const Customer = require('./customer.model');

const orderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
