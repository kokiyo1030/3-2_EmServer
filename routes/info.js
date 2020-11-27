const express = require('express');
const Sensor = require('../models/zone');
const Weight = require('../models/weight');
const Control = require('../models/control');

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

router.post('/postcontrol', (req, res, next) => {
    const control = req.body.control;
    const date = Date.now();

    Control.create({
            control: control,
            CreatedAt: date
        })
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            next(err);
        })
});

router.get("/getcontrol", async (req, res, next) => {
    try {
        const control = await Control.findAll({
            limit: 1,
            order: [
                ['id', 'DESC']
            ]
        });
        res.render('getcontrol', {
            title: '컨트롤',
            control: control.control
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/postweight', (req, res, next) => {
    const weight = req.body.kg;
    const temp = req.body.Temp;
    const date = Date.now();

    Weight.create({
            weight: weight,
            temp: temp,
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