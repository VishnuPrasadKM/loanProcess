const mongoose = require('mongoose')

const waiverSchema = new mongoose.Schema(
    {
        approve:{type:String, required: true},
        reason:{ type: String, required: true},
        itemization:[]
    }
)

module.exports = mongoose.model('waiver', waiverSchema);