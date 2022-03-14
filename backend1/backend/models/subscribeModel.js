const mongoose = require("mongoose")

const subscribe = mongoose.model('subscribe', {
    email: {
        type: String,
        required: true
    }

   
})

module.exports = subscribe;