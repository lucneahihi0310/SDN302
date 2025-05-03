const mongoose = require('mongoose');

const categorieShema = new mongoose.Schema({
    name : {type: String, required: true},
    description : {type: String, required: true},
});

module.exports = mongoose.model('Categorie', categorieShema);