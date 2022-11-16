const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('dotenv').config()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/notFound')

// middleware
app.use(express.json())
app.use(express.static('./public'))


// routes
app.use('/api/tasks', tasks)
app.use(notFound)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`server listening at port ${port}...`))

    } catch (error) {
        console.log(error)
    }
}

start()