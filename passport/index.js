const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        // done(null, user.id);
        done(null, user.email);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    // passport.deserializeUser((id, done) => {
    //     User.findOne({
    //         where: { id },
    //         include: [{
    //             model: User,
    //             attributes: [ 'id', 'nickname' ],
    //         }]
    //     })
    //     .then(user => done(null, user))
    //     .catch(err => done(err));
    // });

    local();
    kakao();
}