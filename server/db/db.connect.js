const mongoose = require('mongoose')
const { ServerConfig } = require('../config')

const connectDB = () => {
    return mongoose.connect(ServerConfig.DB_URL).then(()=>console.log("Database Connected"))
}

module.exports = connectDB;