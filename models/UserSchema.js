const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const { boolean } = require('joi');


const userSchema = new mongoose.Schema({
// const User = mongoose.model('User', new mongoose.Schema({
name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
},
email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    
    unique: true
},
password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
},
phone_number: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 20,
    unique: true
},
isAdmin: Boolean,
        isBusiness : Boolean
})
 


// userSchema.methods.generateAuthToken = function() { 
//     const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin,  isBusiness :this.isBusiness }, config.get('jwtPrivateKey'));
//     return token;
//   }

const User = mongoose.model('User', userSchema);



const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
    phone_number: Joi.string().min(11).max(20).required()
  });

exports.User = User; 
