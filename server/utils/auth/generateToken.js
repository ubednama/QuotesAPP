const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ServerConfig } = require("../../config");

function comparePasswords(password, hashedPassword) {
    try {
        return bcrypt.compareSync(password, hashedPassword);
    } catch (error) {
        console.log(error)
        throw error
    }
}

function generateToken(user) {
    try {
        return jwt.sign(user, ServerConfig.JWT_SECRET, { expiresIn: ServerConfig.JWT_EXPIRY })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function setTokenCookie(token, res) {
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== "development",
    });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, ServerConfig.JWT_SECRET);
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = {
    generateToken,
    setTokenCookie,
    verifyToken,
    comparePasswords
}