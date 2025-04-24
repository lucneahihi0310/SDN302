const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email must be unique value'],
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;