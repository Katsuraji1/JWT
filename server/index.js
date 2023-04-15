const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./router')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/api', router)

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