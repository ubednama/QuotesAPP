const { StatusCodes } = require("http-status-codes")
const { User } = require("../models")
const { SuccessResponse, ErrorResponse, Auth } = require("../utils")
const { AuthService } = require("../services")

const signup = async(req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email })

        if (existingUser) {
            ErrorResponse.error = "User Already Exists"
            ErrorResponse.message = "Signup failed"
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
        }

        const { user, cookie } = await AuthService.registerUser({ ...req.body })
        
        SuccessResponse.message = "User account created Successfully",
        SuccessResponse.data = {user, cookie};
        return res
            .cookie(cookie.name, cookie.token, cookie.options)
            .status(StatusCodes.CREATED)
            .json(SuccessResponse)
    } catch (error) {
        console.log("Error in signup controller:", error.message);
        if (error.name === 'ValidationError') {
            const validationErrors = [];

            for (let field in error.errors) {
                if (error.errors.hasOwnProperty(field)) {
                    validationErrors.push(error.errors[field].message);
                }
            }

            ErrorResponse.error = validationErrors
        }
        ErrorResponse.message = "Signup failed"
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
}

const login = async (req, res) => {
    try {
        const {user, cookie} = await AuthService.loginUser({
            email: req.body.email,
            password: req.body.password
        });
        SuccessResponse.message = "User logged in Successfully"
        SuccessResponse.data = {user, cookie};
        console.log(cookie)
        return res
            .cookie(cookie.name, cookie.token, cookie.options)
            .status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        console.log(error)
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

const logout = async (req, res) => {
    try {
        SuccessResponse.message = "Logout successfully";
        SuccessResponse.data = {};
        SuccessResponse.error = {};
        return res
            .cookie("jwt", "", { maxAge: 0 })
            .status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        console.log("Error in logout controller", error.message)
        console.log(error)
        ErrorResponse.error = error;
        ErrorResponse.message = "Internal server error";
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

module.exports = {
    signup,
    login,
    logout
}