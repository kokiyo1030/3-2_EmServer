const express = require('express');
const Sensor = require('../models/zone');
const Weight = require('../models/weight');
const Control = require('../models/control');
const Temp = require('../models/temp');

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
    const weight = req.body.kg;
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

router.post('/posttemp', (req, res, next) => {
    const temp = req.body.temp;
    const date = Date.now();
    // if (temp < 70) {
        Temp.create({
            temp: temp,
            CreatedAt: date
        })
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            next(err);
        })
    // } 
});

router.post('/control', (req, res, next) => {
    const control = req.body.control;
    const date = Date.now();

    Control.create({
            control: control,
            CreatedAt: date
        })
        .then(result => {
            // res.status(201).json(result);
            res.redirect('/info/control');
        })
        .catch(err => {
            next(err);
        })
});

router.get("/control", async (req, res, next) => {
    try {
        res.render('control', {
            title: '컨트롤'
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/getcontrol', async(req, res, next) => {
    try {
        const control = await Control.findAll({
            limit: 1,
            order: [
                ['id', 'desc']
            ]
        })
        res.render('getcontrol', {
            title: 'json보기',
            control: control[0].control
        })
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;