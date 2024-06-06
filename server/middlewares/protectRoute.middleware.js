const { StatusCodes } = require("http-status-codes");
const { User } = require("../models");
const { ErrorResponse } = require("../utils");
const jwt = require("jsonwebtoken");
const { ServerConfig } = require("../config");

const verifyToken = async (req, res, next) => {
    // const token = req.headers.authorization;
    const token = req.cookies.jwt;
    console.log(req.cookies)
    console.log(token, "\n")
    if (!token) {
       ErrorResponse.error = 'Unauthorized: Missing token';
       return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }
    try {
        const decoded = jwt.verify(token, ServerConfig.JWT_SECRET);

        if (!decoded) {
           ErrorResponse.error = "Unauthorized - Invalid Token";
           return res.status(401).json(ErrorResponse);
        }

        console.log(decoded, decoded.id);

        const user = await User.findById("666162fa4fdf64ab7fb4941a").select("-password");

        console.log("USER checking HERE", user)

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
    verifyToken,
}