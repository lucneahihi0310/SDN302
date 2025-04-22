const mongoose = require('mongoose');
const Genre = require('./genre.model');
//định nghĩa lược đồ dữ liệu cho document book
const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true,'Tên sách không được để trống!'],
        min: [10, 'Minimum length of title is 10 characters!'],
        max: [50, 'Maximum length of title is 50 characters!']
    },

    authors: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'author'
        }],
    publicationYear: Number,
    genre:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: [true, 'Thể loại không được để trống!']
    }
});

// tạo model book từ lược đồ bookSchema
const Book = mongoose.model('books', bookSchema);
module.exports = Book;
