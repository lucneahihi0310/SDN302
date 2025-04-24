const mongoose = require('mongoose');

const starSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        male: {
            type: Boolean,
            required: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        nationality: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Star = mongoose.model('Star', starSchema);

module.exports = Star;