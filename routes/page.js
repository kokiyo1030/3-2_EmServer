const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Zone, User, Weight } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보' });
});

router.get('/', async (req, res, next) => {
    try {
        // const users = await User.findAll({
        //     include: {
        //         model: User,
        //         attributes: ['email', 'nickname']
        //     }
        // });
        res.render('main', {
            title: '축사 관리',
            // user: user
            // zones: zones
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const user = await User.findOne({ where: {email: req.user.email } });
        if (user) {
            res.render('layout', { user: user });
        } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/tables', (req, res) => {
    res.render('left_nav/tables', { title : '테이블 정보' });
});

router.get('/charts', (req, res) => {
    res.render('left_nav/charts', { title: '차트 정보' });
});

router.get('/buttons', (req, res) => {
    res.render('left_nav/components/buttons', { title: '버튼 청보' });
});

router.get('/cards', (req, res) => {
    res.render('left_nav/components/cards', { title: '카드 정보' });
});

router.get('/utilities-color', (req, res) => {
    res.render('left_nav/utilities/utilities-color', { title: '색상 정보' });
});

router.get('/utilities-animation', (req, res) => {
    res.render('left_nav/utilities/utilities-animation', { title: '애니메이션 정보' });
});

router.get('/utilities-border', (req, res) => {
    res.render('left_nav/utilities/utilities-border', { title: '테두리 정보' });
});

router.get('/utilities-other', (req, res) => {
    res.render('left_nav/utilities/utilities-other', { title: '기타 정보' });
});

router.get('/404', (req, res) => {
    res.render('left_nav/pages/404', { title: '404Error' });
});

router.get('/blank', (req, res) => {
    res.render('left_nav/pages/blank', { title: 'Blank Page' });
});

router.get('/forgot-password', (req, res) => {
    res.render('left_nav/pages/forgot-password', { title: 'forgotPassword' });
});

router.get('/map1', async (req, res, next) => {
    var sumPpm = 0;
    var sumMppm = 0;
    var ppmResult = 0;
    var MppmResult = 0;
    try {
        const sensor = await Zone.findAll({
            where: {
                CreatedAt: Date.now()
            }
        });
        const count = await Zone.count({
            where: {
                CreatedAt: Date.now()
            }
        })
        for(i=0; i<count; i++) {
            sumPpm += sensor[i].ppm;
            sumMppm += sensor[i].Mppm;
            ppmResult = sumPpm / count;
            MppmResult = sumMppm / count;
        }
        const weightTemp = await Weight.findAll({
            limit: 1,
            order: [
                ['id', 'DESC']
            ]
        });
        const chart = await Zone.findAll({
            limit: 7,
            order: [
              ['id', 'desc']
            ]
        });
        res.render('map1', {
            title: '내 축사',
            ppm: ppmResult.toFixed(2),
            Mppm: MppmResult.toFixed(2),
            weight: weightTemp[0].weight,
            temp: weightTemp[0].temp,
            chart: chart
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/map2', (req, res) => {
    res.render('map2', { title: '중부리 2축사' });
});

module.exports = router;