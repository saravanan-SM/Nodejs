const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    color: {
        type: String,
    },
    size:{
        type: String,
    },
},{ timestamps: true })


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    product:[productSchema]

}, { timestamps: true });

const User = mongoose.model("userDetails", userSchema)

module.exports = User