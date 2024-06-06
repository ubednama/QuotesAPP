const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const { User } = require("../models");
const { AppError, Auth } = require("../utils");
const { ServerConfig } = require("../config");

async function registerUser(user) {
    try {
        // console.log(user)
        const {fullName, email, password, confirmPassword, gender} = user;

        if (password !== confirmPassword) throw new AppError(passwordMatchError, StatusCodes.BAD_REQUEST);
        
        const salt = await bcrypt.genSalt(ServerConfig.SALT_ROUND)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            gender
        })

        if (newUser) {
            await newUser.save();

            let user = {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email
            }

            const token = Auth.generateToken({ id: user._id, email: user.email })
            Auth.setTokenCookie(token);
            return {user, token}

        } else {
            throw new AppError("Invalid User data", StatusCodes.BAD_REQUEST)
        }

    } catch (error) {
        console.log("Error in signup service\n", error);
        throw new AppError("Internal server error", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function loginUser(credentials){
    try {
        const {email, password} = credentials;

        const user = await User.findOne({email})
        if (!user) {
            throw new AppError("User doesn't exists", StatusCodes.NOT_FOUND)
        }

        const verifyPassword = Auth.comparePasswords(password, user.password)
        if (!verifyPassword) {
            throw new AppError('Password is incorrect', StatusCodes.BAD_REQUEST)
        }

        const token = Auth.generateToken({ id: user.id, email: user.email })
        return {user, token};
    } catch (error) {
        console.log("Error in login service\n", error)
        if (error instanceof AppError) throw error;
        throw new AppError('Internal Server Error', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    registerUser,
    loginUser
}