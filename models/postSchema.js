const Joi = require('joi');
const mongoose = require('mongoose');
const winston = require('winston')


const userSchema = new mongoose.Schema({
// const User = mongoose.model('User', new mongoose.Schema({
user_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
},
restaurant_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
},
restaurant_review: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
},
restaurant_img: {
  type: String,
  
  minlength: 5,
  maxlength: 1024
},

isAdmin: Boolean,
        isBusiness : Boolean
})



const User = mongoose.model('Post', userSchema);



mongoose.connect('mongodb://localhost/Restaurantappdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
    //useFindAndModify: false
})
.then(() => console.log('Database connected'))
.catch(err => console.log('Error', err))


winston.add(new winston.transports.File({
    filename: 'logdbfile.log'
}))



const schema = Joi.object({
    user_name: Joi.string().min(5).max(50).required(),
    restaurant_name: Joi.string().min(5).max(50).required(),
    restaurant_review: Joi.string().min(5).max(50).required(),
    restaurant_img: Joi.string().min(5).max(50)
    
  });

exports.User = User; 

exports.schema =schema;
