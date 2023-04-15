const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`${PORT}`))
    } 
    catch(e) {
        console.log(e)
    }
}

start()