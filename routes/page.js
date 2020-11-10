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
    res.render('tables', {title : '테이블 정보' });
});

module.exports = router;