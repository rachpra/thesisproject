
const express = require("express");
// const { deleteOne } = require("../models/productModel");
const router = express.Router();
const product = require('../models/promoModel')
const { updateOne } = require("../models/promoModel");
const upload = require('../middleware/upload')



//inserting product here
router.post('/message/insert', upload.single('image'), function (req, res) {
    // console.log(req.file);
    if (req.file == undefined) {
        return res.status(400).json({ message: "Invalid" })
    }
    const topic = req.body.topic;
    const image = req.file.filename;
    const description = req.body.description;


    const productdata = new product({
        topic: topic,image: image,
        description: description
    })

    productdata.save().then(function (result) {
        res.status(201).json({ message:"Created campaign successfylly !" });
    }).catch(function (err) {
        res.status(500).json({ message: err })
    })

})

//PRODUCT DELETE
router.delete('/message/delete/:pid', function (req, res) {

    const pid = req.params.pid;
    product.deleteOne({ _id: pid })
        .then(function (result) {
            res.status(200).json({ message: "Message deleted", status: "true" })
        })
        .catch(function (err) {
            res.status(500).json({ message: err, status: "false" })
        })
})

//PRODUCT UPDATE
router.put('/message/update/:id', function (req, res) {
    const id = req.params.id;
    const topic = req.body.topic
    const description = req.body.description

    product.updateOne({
        _id: id, topic: topic
    }).then(function (result) {
        res.status(200).json({ message: "Message has been updated" })
        product.updateOne({
            _id: id, description: description
        }).then(function (result) {
            res.status(200).json({ message: "Message has been updated" })
    }).catch(function (e) {
        res.status(500).json({ message: e })
    })

})
})



//gets all info
router.get('/message/all', function (req, res) {
    product.find().then(function(data){
        res.status(200).json({
            productData: data
        })
    }).catch(function (e) {
        res.status(500).json(e)
    })
})
router.get('/message/single/:id', function (req, res) {
    const id = req.params.id;
    product.findOne({ _id: id }).then(function (data) {
        res.status(200).json({data})
    }).catch(function (err) {
        res.status(500).json({ message: err })
    })
})





module.exports = router