const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {User} = require('../../models/UserSchema');
const admin = require('../../middleware/admin');


router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

 
module.exports = router; 