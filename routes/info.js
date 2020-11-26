const express = require('express');
const Sensor = require('../models/zone');
const Weight = require('../models/weight');

const router = express.Router();

router.post('/postgas', (req, res, next) => {
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

router.post('/postweight', (req, res, next) => {
    const weight = req.body.weight;
    const date = Date.now();

    Weight.create({
            weight: weight,
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