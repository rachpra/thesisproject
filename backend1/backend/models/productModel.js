const mongoose = require("mongoose")

const product = mongoose.model('Product', {

    productName: {
        type: String,
        required: true
    },
    productRate: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productCompany : {
        type : String,
        required : true
    },
    productCategory : {
        type: String,
        required : true
    },
    productQuantity:
    {
        type: String,
        required:true
    }
})

module.exports = product;