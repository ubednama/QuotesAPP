const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ServerConfig } = require("../../config");
const { ErrorResponse } = require("..");
const { StatusCodes } = require("http-status-codes");
const { User } = require("../../models");

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

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        ErrorResponse.error = 'Unauthorized: Missing token';
        return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }
    try {
        const decoded = jwt.verify(token, ServerConfig.JWT_SECRET);

        if(!decoded) {
            ErrorResponse.error = "Unauthorized - Invalid Token";
            return res.status(401).json(ErrorResponse);
        }

        console.log(decoded);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            ErrorResponse.error = "User not found";
            return res.status(404).json(ErrorResponse);
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        ErrorResponse.error = 'Unauthorized: Invalid token';
        return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }
}

module.exports = {
    generateToken,
    setTokenCookie,
    verifyToken,
    comparePasswords
}