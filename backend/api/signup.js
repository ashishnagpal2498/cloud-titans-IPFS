const  route = require('express').Router();
const {User} = require('../model');

route.post('/',async (req,res)=>{
    console.log(req.body,User);
    const user = await User.add({
        email: req.body.email,
        number: req.body.number,
        filesStored: 0,
    },req.body.password);
    if(user.err) return res.status(500).send(user);
        return res.status(201).send(user);
});

exports = module.exports = {route};