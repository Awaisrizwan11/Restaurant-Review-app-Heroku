const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../../models/UserSchema');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const business= require('../../middleware/business');
const auth = require('../../middleware/auth');



router.post('/',[auth, business], async (req, res) => {
  const {
    error
  } = schema.validate(req.body);


  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

user = new User(_.pick(req.body, ['name', 'email', 'password','phone_number']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email','phone_number']));
});

const schema = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  email: Joi.string().min(5).max(50).required(),
  password: Joi.string().min(5).max(50).required(),
  phone_number: Joi.string().min(11).max(20).required()
});

module.exports = router; 
