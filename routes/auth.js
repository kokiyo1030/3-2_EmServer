const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');
const { Passport } = require('passport');

const router = express.Router();

router.get('/register', isNotLoggedIn, async (req, res, next) => {
    res.render('left_nav/pages/register', {title: '회원가입'});
});

router.post('/register', isNotLoggedIn, async (req, res, next) => {
    const { email, nickname, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.redirect('/auth/register');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nickname,
            password: hash
        });
        return res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/login', isNotLoggedIn, async(req, res, next) => {
    res.render('left_nav/pages/login', { title: '로그인' });
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

// router.post('/login',
//     function (req, res, next) {
//         var errors = {};
//         var isValid = true;

//         if (!req.body.username) {
//             isValid = false;
//             errors.username = '아이디를 입력해주세요';
//         }
//         if (!req.body.password) {
//             isValid = false;
//             errors.password = '비밀번호를 입력해주세요';
//         }

//         if (isValid) {
//             next();
//         } else {
//             res.redirect('/auth/login');
//         }
//     },
//     passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/auth/login'
//     }));

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/'
}), (req, res) => {
    res.redirect('/');
});

module.exports = router;