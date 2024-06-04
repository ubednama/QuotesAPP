const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL
const SALT_ROUND = process.env.SALT_ROUND
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRY = process.env.JWT_EXPIRY


module.exports = {
    PORT,
    DB_URL,
    SALT_ROUND,
    JWT_SECRET,
    JWT_EXPIRY
}