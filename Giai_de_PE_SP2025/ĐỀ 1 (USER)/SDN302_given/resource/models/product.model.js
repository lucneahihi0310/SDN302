const mongoose = require('mongoose');
const Categorie = require('./categorie.model');

const categorieSchema = new mongoose.Schema({
    name : { type: String, required: true },
    price : { type: Number, required: true },
    stock : { type: Number, required: true },
    category : { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie', required: true },
});

module.exports = mongoose.model('Product', categorieSchema);