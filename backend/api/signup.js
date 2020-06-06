const  route = require('express').Router();
const {User} = require('../model');

route.post('/',async (req,res)=>{
    const user = await User.add({
        name: req.body.name,
        place: req.body.place,
        email: req.body.email,
        number: req.body.number,
        securityQuestion: req.body.securityQuestion,
        securityAnswer: req.body.securityAnswer,
        imageUrl: req.body.imageUrl,
        phoneNumber: req.body.phoneNumber,
        filesStored: 0,
    },req.body.password);
    if(user.err) return res.status(500).send(user);
        return res.status(201).send(user);
});

exports = module.exports = {route};