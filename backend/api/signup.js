const  route = require('express').Router();
const {User} = require('../model');
const Password = require('../model').Password;
const saltRounds = 10;
const bcrypyt = require('bcrypt');

route.post('/',async (req,res)=>{
    console.log(req.body,User);
    const user = await User.addUser({ email: req.body.email,
        number: req.body.number,
        filesStored: 0,});
        if(user){
            console.log('user created successfully',user);
           return res.status(201).send({
                error: null,
                result: user,
                message:"User created successfully"
            })
        }
        console.error('Error',err1)
});

exports = module.exports = { route};