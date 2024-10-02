const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const { UserRouter } = require('./routes/transaction');
const { loginRouter } = require('./routes/signup');

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

//Connection to db
const db = async ()=>{
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(MONGO_URL)
        console.log("Connected to db")
    } catch (error) {
        console.log("DB Connection error")
    }
}

//Creating API route
app.use('/api/v1', UserRouter)
app.use('/api/v2', loginRouter)


//Connecting to server
const server = () => {
    db()
    app.listen(PORT,()=>{
        console.log("Connected to port: " + PORT)
    }) 
} 
server()