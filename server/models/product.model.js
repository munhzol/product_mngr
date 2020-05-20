const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product title is required"],
        minlength:[2,"Product title must be at least 2 characters"]

    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min:[0.01,"Price must be at least 0.01"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength:[10,"Description must be at least 10 characters"]
    }

},{timestamps: true});

module.exports = ProductSchema;