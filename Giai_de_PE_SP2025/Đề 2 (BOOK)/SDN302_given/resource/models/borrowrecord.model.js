const mongoose = require('mongoose');
const User = require('./user.model');
const Book = require('./book.model');

const borrowRecordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    books: [{
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    borrowDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BorrowRecord', borrowRecordSchema);