const route = require('express').Router();
const passport = require('../passport').passport;

route.get('/',(req,res)=>{
    if(req.user){
        res.status(200).send({
            result: req.user
        })
    }
    else{
        res.status(401).send({
            result: []
        })
    }
})

route.post('/', function(req, res, next) {
    passport.authenticate('local', function(result) {
        console.log("login -- ",result);
        if (Array.isArray(result.result) && !result.result.length) { return res.status(401).send(result) }
        if (result.error) { return res.status(500).send(result) }
        req.logIn(result.result, function(err) {
            if (err) { return res.status(500).send({
                error: err,
                result:[],
                message: "Server Error"
            }) }
            return res.status(200).send(result);
        });
    })(req, res, next);
});

exports = module.exports = {route};