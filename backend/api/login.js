const route = require('express').Router();
const passport = require('../passport').passport;
const {User} = require('../model')
route.get('/:id',async (req,res)=>{
   const user = await User.findById(req.params.id)
    if(user.error) return res.status(500).send(user);
    return res.status(200).send(user)
})

route.post('/', function(req, res, next) {
    passport.authenticate('local', {session: false}, function(result) {
        if (Array.isArray(result.result) && !result.result.length) { return res.status(401).send(result) }
        else if (result.error) { return res.status(500).send(result) }
        else return res.status(200).send(result);
    })(req, res, next);
});

exports = module.exports = {route};