const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ServerConfig } = require("../../config");

const comparePasswords = (password, hashedPassword) => {
    try {
        return bcrypt.compareSync(password, hashedPassword);
    } catch (error) {
        console.log(error)
        throw error
    }
}

const generateToken = (user) => {
    try {
        return jwt.sign(user, ServerConfig.JWT_SECRET, { expiresIn: ServerConfig.JWT_EXPIRY })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const setTokenCookie = (token) => {
    const cookieOptions = {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
    };
    return ('jwt', token, cookieOptions);
}

module.exports = {
    generateToken,
    setTokenCookie,
    comparePasswords
}