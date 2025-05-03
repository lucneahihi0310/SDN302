const express = require('express');
const router = express.Router();
const Borrow = require('../models/borrowrecord.model');
const mongoose = require('mongoose');

router.get('/user/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const borrowRecords = await Borrow.find({ userId }).populate('books.bookId', 'title author price stock');
        if (!borrowRecords || borrowRecords.length === 0) {
            return res.status(404).json({ message: 'No borrow records found for this user' });
        }
        const formattedRecords = borrowRecords.map(record => ({
            _id: record._id,
            borrowDate: record.borrowDate,
            books: record.books.map(book => ({
                _id: book.bookId._id,
                title: book.bookId.title,
                author: book.bookId.author
            }))
        }));
        res.status(200).json(formattedRecords);
    } catch (error) {
        next(error);
    }
});

router.get('/:recordId', async (req, res, next) => {
    try {
        const { recordId } = req.params;
        const borrowRecord = await Borrow.findById(recordId)
            .populate('books.bookId', 'title author price stock')
            .populate('userId', 'name email');
        if (!borrowRecord) {
            return res.status(404).json({ message: 'No borrow record found' });
        }
        const formattedRecord = {
            _id: borrowRecord._id,
            borrowDate: borrowRecord.borrowDate,
            user: {
                _id: borrowRecord.userId._id,
                name: borrowRecord.userId.name,
                email: borrowRecord.userId.email
            },
            books: borrowRecord.books.map(book => ({
                _id: book.bookId._id,
                title: book.bookId.title,
                author: book.bookId.author,
                quantity: book.quantity
            }))
        };
        res.status(200).json(formattedRecord);

    } catch (error) {
        next(error);
    }
});

router.post('/create', async (req, res, next) => {
    try {
        const { userId, books } = req.body;
        if (!userId || !books || books.length === 0) {
            return res.status(400).json({ message: 'User ID and books are required' });
        }
        for (const book of books) {
            if (!book.bookId || !book.quantity) {
                return res.status(400).json({ message: 'Book ID and quantity are required for each book' });
            }
        }

        const borrow = new Borrow({
            userId,
            books: books.map(book => ({
                bookId: book.bookId,
                quantity: book.quantity
            })),
            borrowDate: new Date()
        });
        const bor = await borrow.save();
        // const borrowRecord = await Borrow.findById(borrow._id)
        //     .populate('books.bookId', 'title author price stock')
        //     .populate('userId', 'name email');
        // if (!borrowRecord) {
        //     return res.status(404).json({ message: 'Borrow record not found' });
        // }
        res.status(201).json(bor);
        // res.status(201).json({
        //     _id: borrowRecord._id,
        //     borrowDate: borrowRecord.borrowDate,
        //     user: {
        //         _id: borrowRecord.userId._id,
        //         name: borrowRecord.userId.name,
        //         email: borrowRecord.userId.email
        //     },
        //     books: borrowRecord.books.map(book => ({
        //         _id: book.bookId._id,
        //         title: book.bookId.title,
        //         author: book.bookId.author,
        //         quantity: book.quantity
        //     }))
        // });
    } catch (error) {
        next(error);
    }
});

router.delete('/:recordId', async (req, res, next) => {
    try {
        const { recordId } = req.params;
        const deleted = await Borrow.findByIdAndDelete(recordId);
        if (!deleted) {
            const err = new Error('Borrow record not found');
            err.status = 404;
            return next(err);
        }
        res.status(200).json({ message: 'Borrow record deleted successfully' });
    } catch (error) {
        next(error);
    }
});

router.put('/:recordId', async (req, res, next) => {
    try {
        const { recordId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(recordId)) {
            const err = new Error('Invalid record ID format');
            err.status = 400;
            return next(err);
        }
        
        const { books } = req.body;

        if (!books || books.length === 0) {
            const err = new Error('Books are required for update');
            err.status = 400;
            return next(err);
        }

        for (const book of books) {
            if (!book.bookId || !book.quantity) {
                const err = new Error('Each book must have bookId and quantity');
                err.status = 400;
                return next(err);
            }
        }

        const updated = await Borrow.findByIdAndUpdate(
            recordId,
            {
                books: books.map(book => ({
                    bookId: book.bookId,
                    quantity: book.quantity
                }))
            },
            { new: true }
        )
        .populate('books.bookId', 'title author price stock')
        .populate('userId', 'name email');

        if (!updated) {
            const err = new Error('Borrow record not found');
            err.status = 404;
            return next(err);
        }

        res.status(200).json(
            {
            _id: updated._id,
            borrowDate: updated.borrowDate,
            user: {
                _id: updated.userId._id,
                name: updated.userId.name,
                email: updated.userId.email
            },
            books: updated.books.map(book => ({
                _id: book.bookId._id,
                title: book.bookId.title,
                author: book.bookId.author,
                quantity: book.quantity
            }))
        }
    );
    } catch (error) {
        next(error);
    }
});




module.exports = router;