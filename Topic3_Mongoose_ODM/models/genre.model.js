const mongoose = require('mongoose');

const genre = mongoose.model('genres', new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên thể loại không được để trống!'],
        unique: [true, 'Tên thể loại đã tồn tại!']
    },
    description: String
}));

module.exports = genre;