const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const Customer = require('../models/customer.model');

router.get('/', async (req, res, next) => {
    try {
        const orders = await Order.find();
        // Check if orders exist
        if (!orders || orders.length === 0) {
            const error = new Error('No orders found');
            error.status = 404;
            return next(error);
        }
        // const formattedOrders = orders.map(order => ({
        //     id: order._id,
        //     customerId: order.customerId,
        //     products: order.products.map(item => ({
        //         productId: item.productId._id,
        //         name: item.productId.name,
        //         quantity: item.quantity,
        //         price: item.productId.price,
        //         stock: item.productId.stock
        //     })),
        //     totalPrice: order.totalPrice,
        //     orderDate: order.orderDate
        // }));
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
});

router.get('/customer/:customerId', async (req, res, next) => {

    try {
        const { customerId } = req.params;
        const orders = await Order.find({customerId: customerId }).populate('products.productId', 'name price stock');
        
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this customer.' });
        }

        const formattedOrders = orders.map(order => ({
            _id: order._id,
            orderDate: order.orderDate,
            products: order.products.map(p => ({
                _id: p.productId._id,
                name: p.productId.name,
                price: p.productId.price,
            }))
        }));

        res.status(200).json(formattedOrders);
    } catch (error) {
        next(error);
    }
});

router.get('/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId).populate('products.productId', 'name price stock').populate('customerId');
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        const formattedOrder = {
            _id: order._id,
            orderDate: order.orderDate,
            customer: {
                _id: order.customerId._id,
                name: order.customerId.name,
                email: order.customerId.email
            },
            products: order.products.map(p => ({
                _id: p.productId._id,
                name: p.productId.name,
                price: p.productId.price,
                quantity: p.quantity
            })),
            totalPrice: order.totalPrice
        };

        res.status(200).json(formattedOrder);
    } catch (error) {
        next(error);
    }
});

router.post('/create', async (req, res, next) => {
    try {
        const { customerId, products } = req.body;

        // Validate input
        if (!customerId || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'Invalid request body' });
        }

        // Lấy thông tin chi tiết của từng productId và tính totalPrice
        let totalPrice = 0;
        const populatedProducts = [];

        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
            }

            populatedProducts.push({
                productId: product._id,
                quantity: item.quantity
            });

            totalPrice += product.price * item.quantity;
        }

        // Tạo đơn hàng mới
        const order = new Order({
            customerId,
            products: populatedProducts,
            totalPrice,
            orderDate: new Date()
        });

        await order.save();

        // Populate lại để trả về thông tin sản phẩm đầy đủ
        const savedOrder = await Order.findById(order._id).populate('products.productId', 'name price').lean();

        res.status(201).json({
            _id: savedOrder._id,
            customerId: savedOrder.customerId,
            orderDate: savedOrder.orderDate,
            products: savedOrder.products.map(p => ({
                _id: p.productId._id,
                name: p.productId.name,
                price: p.productId.price,
                quantity: p.quantity
            })),
            totalPrice: savedOrder.totalPrice
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;