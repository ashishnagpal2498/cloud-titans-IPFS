const route = require('express').Router();
const {Files} = require('../model');


route.get('/:id',async (req,res)=>{
    console.log('Params Id',req.params.id);
    const file = await Files.findById(req.params.id)
    if(file.error) return res.status(500).send(file);
    return res.status(200).send(file);
});

exports = module.exports = route;