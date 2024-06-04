const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser");
require('express-async-errors')

const { ServerConfig } = require('./config');
const routes = require('./routes');
const connectDB = require('./db/db.connect');

const app = express();
const PORT = ServerConfig.PORT

const corsOptions = {
    credentials: true
}

app.use(cors(corsOptions));
// app.use(cors)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use('/', routes)

const startServer = async() => {
    try {
        await connectDB()
        app.listen(PORT, ()=> {
            console.log(`Server is running on Port ${PORT}`)
        })
    } catch (error) {
        console.error(error)
    } 
}   

startServer();