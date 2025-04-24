const mongoose = require('mongoose');

const author = mongoose.model('authors', new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        max: [50, 'Name must be less than 50 characters']
    },
    gender: Boolean,
    dob: Date,
    addresses: [new mongoose.Schema({
        street: String,
        type: String,
        city: String,
        country: String
    })],
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
}));

module.exports = author;