"use strict" 
var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    title: String, 
    description: String,
    price: Number,
    images: String
});

var Items = mongoose.model('Items', itemSchema);
module.exports = Items; 
