const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema(
    {
        loanNum:{type:String, required: true},
        name:{type:String, required: true},
        address:{type:String, required: true},
        city:{type:String, required: true},
        state:{type:String, required: true},
        amount:{type:Number, required: true},
        type:{type:String, required: true},
        product:{type:String, required: true},
        status:{type:String, required: true},
        days:{type:Number, required: true},
    }
)

module.exports = mongoose.model('data', dataSchema)