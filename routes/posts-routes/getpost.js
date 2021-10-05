const express = require('express');
const router = express.Router();
const {User} = require('../../models/postSchema');



router.get('/', async (req, res) => {
    const users = await User.find().sort('user_name');
    res.send(users);
});

 
module.exports = router; 