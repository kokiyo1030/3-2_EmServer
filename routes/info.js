const express = require('express');
const Sensor = require('../models/zone');

const router = express.Router();

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