const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./model').User;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },async function(email, password, done) {
        let userResult = await User.find(email,password);
            console.log('userResult',userResult);
            return done(userResult);
    }
));

exports = module.exports = {
    passport
}