const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./model').User

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
    User.find({_id}).toArray(function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    },
    function(username, password, done) {
        User.find({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

exports = module.exports = {
    passport
}