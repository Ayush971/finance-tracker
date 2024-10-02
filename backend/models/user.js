const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        required:true,
        type: String
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
})

const userModel = mongoose.model('user', userSchema)
module.exports = { User: userModel };