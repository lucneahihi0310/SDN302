const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

router.get('/', async (req, res, next) => {
    try {
        const products = await Product.find().populate({
            path: 'category',
            select: 'name description'
        });
        // Check if products exist
        if (!products || products.length === 0) {
            const error = new Error('No products found');
            error.status = 404;
            return next(error);
        }
        const formattedProducts = products.map(product => ({
            id: product._id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: product.category ? {
                id: product.category._id,
                name: product.category.name || 'Unknown',
                description: product.category.description
            } : null
        }));


        res.status(200).json(formattedProducts);
    } catch (error) {
        next(error);
    }
});

module.exports = router;