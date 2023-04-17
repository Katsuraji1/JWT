const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./router')
const errorMiddleware = require('./middlewares/ErrorMiddleware')
require('dotenv').config()

const app = express()

app.use(cors(
    {
        credentials: true,
        origin: process.env.FRONTEND_HOST
    }
))
app.use(cookieParser())
app.use(express.json())
app.use('/api', router)

app.use(errorMiddleware)

const PORT = process.env.PORT

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`${PORT}`))
    } 
    catch(e) {
        console.log(e)
    }
}

start()