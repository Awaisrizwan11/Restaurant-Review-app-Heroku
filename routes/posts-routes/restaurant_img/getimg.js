const _ = require('lodash');
const {User} = require('../../../models/postSchema');
const express = require('express');
const router = express.Router();
const Joi = require('joi');



router.get('/' ,async (req, res) => {
  
    res.sendFile(__dirname +'C:/Users/CyberFoxWS3/Desktop/Restaurant-App Project/restaurant-app-frontend/src/Dashboard/Additems/Additem.js')

});



module.exports = router; 
