const _ = require('lodash');
const {
    User
} = require('../../models/register');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const business = require('../../middleware/business');
const auth = require('../../middleware/auth');
const bcrypt = require('bcrypt');


router.put('/:id', [auth, business], async (req, res) => {
    const {
        error
    } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const users = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone_number: req.body.phone_number
    }, {
        new: true
    });

    if (!users) return res.status(404).send('The user with the given ID was not found.');

    const salt = await bcrypt.genSalt(10);
    users.password = await bcrypt.hash(users.password, salt);
    await users.save();
    
    res.send(users);
});

const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
    phone_number: Joi.string().min(11).max(20).required()
});
module.exports = router;