const mongoose = require('mongoose');
const Producer = require('./producer.model');
const Director = require('./director.model');
const Star = require('./star.model');

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        release: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        producer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Producer',
            required: true,
        },
        director: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Director',
            required: true,
        },
        genres: {
            type: [String],
            required: true,
        },
        stars: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Star',
            },
        ],
        createAt: {
            type: Date,
            default: Date.now
        },
        updateAt: {
            type: Date,
            default: Date.now
        }
    }

);

module.exports = mongoose.model('Movie', movieSchema);
