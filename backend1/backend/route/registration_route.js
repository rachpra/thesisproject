const express = require('express');
const router = express.Router();
const user = require('../models/registration_model')
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs'); // encrypt and decrypt garna lai
const jwt = require('jsonwebtoken'); //token generated garna lai
const Registration = require('../models/registration_model');

router.post('/user/registration',
    [
        check('fullname', "Full Name required").not().isEmpty(),
        check('email', "Invalid Email").isEmail(),
        check('email', "email required").not().isEmpty(),
        check('password', "Password required").not().isEmpty(),
        check('address', "address required").not().isEmpty(),
        check('phone', "phone number required").not().isEmpty(),
        check('userType', "userType required").not().isEmpty()
    ],
    function (req, res) {
        // res.render('../templates/signup')
        const errors = validationResult(req)

        if (errors.isEmpty()) {
            // console.log(req.body)
            const fullname = req.body.fullname
            const email = req.body.email
            const password = req.body.password
            const address = req.body.address
            const phone = req.body.phone
            const userType = req.body.userType

            //encryption
            bcryptjs.hash(password, 10, function (err, hash) {
                const me = new user({
                    fullname: fullname, email: email, password: hash, address: address, phone: phone, userType: userType
                })
                me.save().then(function (result) {
                    res.status(200).json({ message: "Registration Successfull" })
                }).catch(function (err) {
                    res.status(201).json({ message: err })
                    console.log(err)
                })
            })
        }

        else {
            res.status(500).json(errors.array())
            console.log(errors)
        }

    })

router.post('/user/login', function (req, res) {
    const email = req.body.email
    const password = req.body.password

    //now we need to find if we the user exits
    user.findOne({ email: email }).
        then(function (userData) {
            if (userData === null) {
                //username does not exits
                return res.status(201).json({ success: false, message: "Credentials doesn't match!!!" })

            }

            bcryptjs.compare(password, userData.password, function (err, result) {
                if (result == false) {
                    return res.status(201).json({ success: false, message: "Credentials doesn't match!!! Please try again" })
                }
                //token generate
                const token = jwt.sign({ userId: userData._id }, 'secretkey');
                res.status(200).json({
                    message: "Auth Success",
                    token: token,
                    success: true,
                    userType: userData.userType,
                    fullname: userData.fullname,
                    id: userData._id,
                    userdetails:[userData]
                        
                    
                })
                // res.send("correct!!")
            })

        }).catch(
            function (err) {
                res.status(500).json({ message: err })
            }
        )
})

router.get('/user/all', function (req, res) {
    Registration.find().then(function (data) {
        res.status(200).json({
            userData: data
        })
    }).catch(function (e) {
        res.status(500).json(e)
    })
})

router.put('/user/update/:id', function (req, res) {
    const id = req.params.id;
    const fullname = req.body.fullname
    const phone = req.body.phone
    const address = req.body.address

    Registration.updateOne({ _id: id }, { fullname: fullname }
    ).then(function (result) {
        res.status(200).json({ message: "Details has been updated",success : true })
    })

    Registration.updateOne({ _id: id }, { phone: phone }).then(function (result) {
        res.status(200).json({ message: "Details has been updated" })
    })

    Registration.updateOne({ _id: id }, { address: address }).then(function (result) {
        res.status(200).json({ message: "Details has been updated" })

    }).catch(function (e) {
        res.status(500).json({ message: e })
    })
})



router.get('/user/single/:id', function (req, res) {
    const id = req.params.id;
    Registration.findOne({ _id: id }).then(function (data) {
        res.status(200).json({ data })
    }).catch(function (err) {
        res.status(500).json({ message: err })
    })
})

router.delete('/account/delete/:id', function (req, res) {

    const id = req.params.id;
    Registration.deleteOne({ _id: id })
        .then(function (result) {
            res.status(200).json({ message: "Account has been deleted successfully !!!", status: "true" })
        })
        .catch(function (err) {
            res.status(500).json({ message: err, status: "false" })
        })
})


module.exports = router