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
    passport.authenticate('local', {session: false}, function(result) {
        console.log("login -- ",result);
        if (Array.isArray(result.result) && !result.result.length) { return res.status(401).send(result) }
        else if (result.error) { return res.status(500).send(result) }
        else return res.status(200).send(result);
    })(req, res, next);
});

exports = module.exports = {route};