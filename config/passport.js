const JwtStrategy = require('passport-jwt').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users')
const keys = require("./config");

const options = {
    secretOrKey: keys.jwt,
    jwtFromRequest: function (req){
        if(req && req.cookies){
            return req.cookies['jwt']
        }
    }
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, function(jwt_payload, done) {
            User.findOne({id: jwt_payload.sub}, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }))
}