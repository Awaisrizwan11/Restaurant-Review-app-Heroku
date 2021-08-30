const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/register');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
  const {
    error
  } = schema.validate(req.body);


let user = await User.findOne({ email: req.body.email });
if (!user) return res.status(400).send('Invalid email or password.');

const validPassword = await bcrypt.compare(req.body.password, user.password);
if (!validPassword) return res.status(400).send('Invalid email or password.');

 
  const token = user.generateAuthToken();
  res.send(token);

  

});

const schema = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  email: Joi.string().min(5).max(50).required(),
  password: Joi.string().min(5).max(50).required(),
  phone_number: Joi.string().min(11).max(20).required()
});



module.exports = router;