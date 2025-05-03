const express = require('express');
const router = express.Router();
const Book = require('../models/book.model');

router.get('/', async (req, res) => {
    try {
        const books = await Book.find().populate('categoryId', 'name description');
        if (!books || books.length === 0) {
            return res.status(404).json({ message: 'No books found' });
        }
        const formattedBooks = books.map(book => ({
            id: book._id,
            title: book.title,
            author: book.author,
            price: book.price,
            stock: book.stock,
            category: {
                id: book.categoryId._id,
                name: book.categoryId.name
            }
        }));
        res.status(200).json(formattedBooks);
    } catch (error) {
        next(error);
    }
});

module.exports = router;