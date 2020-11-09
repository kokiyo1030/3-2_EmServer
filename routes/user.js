const express = require('express');

const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/:id/profile', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: {id: req.user.id } });
        if (user) {
            res.render('profile', {title: '내 정보'});
        } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;