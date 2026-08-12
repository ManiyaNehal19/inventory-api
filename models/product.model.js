const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const product = new Schema({
    "id":{ type: String, unique: true},
    "name": String,
    "quantity": Number,
    "price": Number,
    "tags": [String],
    "main_category": String

});

const Product = model("products",product);
module.exports= Product;