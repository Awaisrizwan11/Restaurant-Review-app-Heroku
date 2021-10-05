const _ = require('lodash');
const {User} = require('../../models/postSchema');
const express = require('express');
const router = express.Router();
const Joi = require('joi');



router.post('/' ,async (req, res) => {
  const {
    error
  } = schema.validate(req.body);


user = new User(_.pick(req.body, ['user_name', 'restaurant_name', 'restaurant_review']));
  await user.save();
  res.send(user)


});


const schema = Joi.object({
    user_name: Joi.string().min(5).max(50).required(),
    restaurant_name: Joi.string().min(5).max(50).required(),
    restaurant_review: Joi.string().min(5).max(50).required(),
    restaurant_img: Joi.string().min(5).max(50)
    
  });

module.exports = router; 
