const express = require('express');
const Sensor = require('../models/zone');
const User = require('../models/user');
const { isLoggedIn } = require('./middlewares');
const mysql = require('mysql2');

const router = express.Router();

router.post('/:id/farminfo', async(req, res, next) => {
    try {
        const user = await User.findOne({ where: {id: req.user.id } });
        const sensor = await Sensor.findAll();
        if (user) {
            res.render('map1', {title: '내 축사'});
        } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;