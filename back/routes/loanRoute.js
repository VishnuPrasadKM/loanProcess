const express = require('express')
const router = express.Router()
const Data = require('../model/dataModel')

// Loan Data
  // Fetching all data
    router.get('/', async(req, res) =>{
        const data = await Data.find()
        res.status(200).json(data)
    });

  // Fetching a single data
    router.get("/:id", async (req, res) => {
        try {
          const data = await Data.findById(req.params.id)
          if(data == null){
            return res.status(404).json({message:'Cannot find loanId'})
          }
          res.send(data);
        } catch (error) {
          return res.status(400).json(error);
        }
      });

  // Create data
    router.post('/', async(req, res) =>{
        const data = new Data({
            loanNum:req.body.loanNum,
            name:req.body.name,
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
            const newData= await data.save()
            res.status(201).json(newData)
        } catch(error){
            res.status(400).json({message: error.message})
        }
    });


module.exports = router