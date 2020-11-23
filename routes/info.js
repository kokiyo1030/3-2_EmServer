const express = require('express');
const Sensor = require('../models/zone');

const router = express.Router();

router.get('/getinfo', async (req, res, next) => {
    try {
        const sensor = await Sensor.findAll({});
        res.render('map1', {
            title: '내 축사',
            info: sensor
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/postinfo', (req, res, next) => {
    const VRL = req.body.VRL;
    const ppm = req.body.ppm;
    const Mppm = req.body.Mppm;
    const date = Date.now();

    Sensor.create({
            VRL: VRL,
            ppm: ppm,
            Mppm: Mppm,
            CreatedAt: date
        })
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            next(err);
        })
});

module.exports = router;