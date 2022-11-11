const express = require('express')
const router = express.Router()
const Data = require('../model/rateLockModel')

// Loan Data
  // Fetching all data

    router.get("/", async (req, res) => {
      try {
        const data = await Data.find();
        res.send(data);
      } catch (error) {
        return res.status(400).json(error);
      }
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
          loanId:req.body.loanId,
          valid:req.body.valid,
          expire:req.body.expire,
          ftp:req.body.ftp,
          notes:req.body.notes,
        })
        try{
            const newData= await data.save()
            res.status(201).json(newData)
        } catch(error){
            res.status(400).json({message: error.message})
        }
    });


module.exports = router