const express = require('express');
const Sensor = require('../models/zone');
const User = require('../models/user');
const { isLoggedIn } = require('./middlewares');
const mysql = require('mysql2');

const router = express.Router();

router.get('/:id/farminfo', isLoggedIn, async(req, res, next) => {
    try {
        const user = await User.findOne({ where: {id: req.user.id } });
        const sensor = await Sensor.findAll({});
        var result = returnResult(err, res);
        if (user) {
            result.message = sensor;
            res.render('map1', {
                title: '내 축사',
                info: rows
            });
        } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

var returnResult = function (err, res) {
    // 결과를 눈으로 보기 쉽게하기 위해 result 객체 생성
    var result = {};
    if (err) {
        res.status(400);
        result.message = err.stack;
    } else {
        res.status(200);
        result.message = "Success";
    }
    return result;
}

module.exports = router;