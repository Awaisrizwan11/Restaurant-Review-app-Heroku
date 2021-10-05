const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const {User} = require('../../models/UserSchema');


router.delete('/:id', [auth, admin], async (req, res) => {
    const users = await User.findByIdAndRemove(req.params.id);

    if (!users) return res.status(404).send('The user with the given ID was not found.');

    res.send(users);
});


module.exports = router; 