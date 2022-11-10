const mongoose = require('mongoose')

const rateLockSchema = new mongoose.Schema(
    {
        loanId:{type:String, required: true},
        valid:{type:String, required: true},
        expire:{type:String, required: true},
        ftp:{type:String},
        notes:{type:String},
    }
)

module.exports = mongoose.model('rateLock', rateLockSchema)