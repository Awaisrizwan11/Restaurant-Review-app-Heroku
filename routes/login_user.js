const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/UserSchema');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', async (req, res) => {
  const {
    error
  } = schema.validate(req.body);

let user = await User.findOne({ email: req.body.email });

if (!user) return res.status(400).send('Invalid email .');

const validPassword = await bcrypt.compare(req.body.password, user.password);
if (!validPassword) return res.status(400).send('Invalid  password.');


let generateFunction = (u) =>{
  console.log(config.get('jwtPrivateKey'))
    const token = jwt.sign({ _id: u._id, isAdmin: u.isAdmin,  isBusiness :u.isBusiness }, "mykey");
    console.log(token)
    return token
    
  }
  const token = generateFunction(user);
    res.send(token);  
    console.log(token)
  }
  
);

const schema = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  email: Joi.string().min(5).max(50).required(),
  password: Joi.string().min(5).max(50).required(),
  phone_number: Joi.string().min(11).max(20).required()
});



module.exports = router;