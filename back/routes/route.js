const express = require('express')
const router = express.Router()
const Data = require('../model/dataModel')

// Fetching all data
router.get('/', async(req, res) =>{
    const data = await Data.find()

    res.status(200).json(data)
});
// Create data
router.post('/', async(req, res) =>{
    const newData = new Data({
        loanNum:req.body.loanNum,
        name:req.body.loanNum,
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        amount:req.body.amount,
        type:req.body.type,
        product:req.body.product,
        status:req.body.status,
        days:req.body.days
    })
    try{
         await newData.save()
        res.status(201).json(newData)
    } catch(error){
        res.status(400).json({message: error.message})
    }
});

// To reduce waivers
router.patch('/:id', async(req, res) =>{
    res.status(200).json({message:`Update Data ${req.params.id}`})
})

module.exports = router