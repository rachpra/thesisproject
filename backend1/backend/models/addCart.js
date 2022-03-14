const mongoose = require("mongoose")

const addcart = mongoose.model('Addcart', {
    productID:
    {
        type: String
    },
    consumerID:
    {
        type: String
    },


    productName: {
        type: String,
        required: true
    },

    productRate: {
        type: String,
        required: true
    },
    productImage: {
        type: String
    }
})

module.exports = addcart;