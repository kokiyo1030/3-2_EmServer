const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Zone, User } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보' });
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', { title: '회원가입' });
});

router.get('/', async (req, res, next) => {
    try {
        const zones = await Zone.findAll({
            include: {
                model: User,
                attributes: ['id', 'nickname']
            },
            order: [['createdAt', 'DESC']]
        });
        res.render('main', {
            title: '축사 관리',
            zones: zones
        });
    } catch (err) {
        console.error(err);
        next(err);
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

router.get('/login', (req, res) => {
    res.render('left_nav/pages/login', { title: 'login' });
});

router.get('/register', (req, res) => {
    res.render('left_nav/pages/register', { title: 'register' });
});

router.get('/map1', (req, res) => {
    res.render('map1', { title: '중부리 1축사' });
});

router.get('/map2', (req, res) => {
    res.render('map2', { title: '중부리 2축사' });
});

module.exports = router;