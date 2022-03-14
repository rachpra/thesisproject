
const express = require("express");
const authentication = require("../middleware/authentication");
const cart = require('../models/addCart')
const product = require('../models/productModel')
const router = express.Router();
const addcart = require('../models/addCart')

const { updateOne } = require("../models/addCart");


//inserting product here
router.post('/addtocart/insert/:id', authentication.verifyUser, function (req, res) {
    const productId = req.params.id
    const consumerID = req.userData._id
    product.findOne({ _id: productId })
        .then(function (data) {
            const name = data.productName
            const rate = data.productRate
            const image = data.productImage

            const cartdata = new cart({
                consumerID: consumerID, productId: productId,
                productName: name, productRate: rate, productImage: image
            })

            cartdata.save()
                .then(function (result) {
                    res.status(201).json({ success: true, message: "Added to cart" })
                })
        }).catch(function (err) {
            res.status(500).json({ message: err })
        })
})



//PRODUCT DELETE
router.delete('/addcart/delete/:pid', function (req, res) {

    const pid = req.params.pid;
    cart.deleteOne({ _id: pid })
        .then(function (result) {
            res.status(200).json({ message: "Removed from your cart", success: true })
        })
        .catch(function (err) {
            res.status(500).json({ message: err, status: "false" })
        })
})


//get cart items
router.get('/getcart/all',authentication.verifyUser, function (req, res) {
    const userId = req.userData._id
    cart.find({ consumerID: userId })
        .then(function (data) {
            res.status(200).json({
                cartdata:data, success: true
            })
        }).catch(function (e) {
            res.status(500).json(e)
        })
})

//to show only single element
router.get('/addcart/single/:id', function (req, res) {
    const id = req.params.id;
    addcart.findOne({ _id: id }).then(function (data) {
        res.status(200).json({ data })
    }).catch(function (err) {
        res.status(500).json({ message: err })
    })
})


module.exports = router