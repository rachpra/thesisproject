const mongoose = require("mongoose")

const promo = mongoose.model('Promo', {
    topic: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
   
})

module.exports = promo;