const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils");
const { UserService } = require("../services");

const getAllUsers = async (req, res) => {
    try {
        const { users, totalUsers } = await UserService.fetchAllUsers(req, res);

        if (users?.length === 0) {
            SuccessResponse.message = "No users available";
            return res.status(StatusCodes.NOT_FOUND).json(SuccessResponse);
        }

        SuccessResponse.message = "Users fetched successfully";
        SuccessResponse.data = { users, totalUsers };
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        ErrorResponse.error = "Internal server error";
        ErrorResponse.message = "Failed to fetch users";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

const getAllPersonalities = async (req, res) => {
    try {
        const { personalities, totalPersonalities } = await UserService.fetchAllPersonalities(req, res);

        if (personalities?.length === 0) {
            SuccessResponse.message = "No personalities available";
            return res.status(StatusCodes.NOT_FOUND).json(SuccessResponse);
        }

        SuccessResponse.message = "Personalities fetched successfully";
        SuccessResponse.data = { personalities, totalPersonalities };
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error("Error fetching personalities:", error.message);
        ErrorResponse.error = "Internal server error";
        ErrorResponse.message = "Failed to fetch personalities";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

const getUserByName = async (req, res) => {
    try {
        const user = await UserService.fetchUserByName(req.params.name);

        if (!user) {
            SuccessResponse.message = "No user found with the specified name";
            return res.status(StatusCodes.NOT_FOUND).json(SuccessResponse);
        }

        SuccessResponse.message = "User fetched successfully";
        SuccessResponse.data = user;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error("Error fetching user by name:", error.message);
        ErrorResponse.error = "Internal server error";
        ErrorResponse.message = "Failed to fetch user by name";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

const getPersonalityByName = async (req, res) => {
    try {
        const personality = await UserService.fetchPersonalityByName(req.params.name);

        if (!personality) {
            SuccessResponse.message = "No personality found with the specified name";
            return res.status(StatusCodes.NOT_FOUND).json(SuccessResponse);
        }

        SuccessResponse.message = "Personality fetched successfully";
        SuccessResponse.data = personality;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error("Error fetching personality by name:", error.message);
        ErrorResponse.error = "Internal server error";
        ErrorResponse.message = "Failed to fetch personality by name";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

module.exports = {
    getAllUsers,
    getAllPersonalities,
    getUserByName,
    getPersonalityByName
};