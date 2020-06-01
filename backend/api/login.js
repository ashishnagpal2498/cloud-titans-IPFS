const route = require('express').Router();
const passport = require('../passport');


route.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return res.status(500).send({
            error: err,
            result:[],
            message: "Server Error"
        }) }
        if (!user) { return res.status(401).send({
            error: null,
            result: null,
            message: "User not found"
        }) }
        req.logIn(user, function(err) {
            if (err) { return res.status(500).send({
                error: err,
                result:[],
                message: "Server Error"
            }) }
            return res.redirect('/users/' + user.username);
        });
    })(req, res, next);
});

exports = module.exports = {route};