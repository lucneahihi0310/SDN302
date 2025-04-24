const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
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

const Director = mongoose.model('Director', directorSchema);

module.exports = Director;