const passport = require('passport');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({
            where: { id },
            include: [{
                model: User,
                attributes: [ 'id', 'nickname' ],
            }]
        })
        .then(user => done(null, user))
        .catch(urr => done(err));
    });
}