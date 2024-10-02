const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    name: {
        required:true,
        type: String
    },
    amount:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    }
},{timestamps:true})

const expenseModel = mongoose.model('expense', expenseSchema)
module.exports = { expense: expenseModel };