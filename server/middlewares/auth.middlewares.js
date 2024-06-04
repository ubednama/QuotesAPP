const { StatusCodes } = require("http-status-codes");
const validator = require("email-validator");
const { ErrorResponse, ErrorMessage, Utils, AppError } = require("../utils");

function validateSingupRequest(req, res, next) {
    const { fullName, email, password, confirmPassword, gender } = req.body

    
    if(!fullName || !email || !password || !confirmPassword || !gender) {
        ErrorResponse.error = "Provide complete details to create an Account"
    } else if(password !== confirmPassword) {
        ErrorResponse.error = ErrorMessage.passwordMatchError

    // } else if (!Utils.passwordRegex.test(password)) {
    } else if (false) { //!Utils.passwordRegex.test(password)
        ErrorResponse.error = ErrorMessage.passwordFormatError
    
    // } else if (!validator.validate(email)) {
    } else if (false) {       //!validator.validate(email)
        ErrorResponse.error = ErrorMessage.emailFormatError
    }
    
    if (Object.keys(ErrorResponse.error).length>0) {
        console.log(ErrorResponse.error)
        ErrorResponse.message = "Signup failed"
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    next()
}

function validateLoginRequest(req, res, next) {
    const {email, password} = req.body;

    if (!email || !password) {
        ErrorResponse.message = "Enter proper Credentials";

        if (!email && !password) {
            ErrorResponse.error = new AppError(["Email & password cannot be empty"])
        } else if (!email) {
            ErrorResponse.error = new AppError(["Provide proper Email"])
        } else {
            ErrorResponse.error = new AppError(["Password field cannot be empty"])
        }

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }

    next();
}

module.exports = {
    validateSingupRequest,
    validateLoginRequest
}