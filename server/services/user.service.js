const { StatusCodes } = require("http-status-codes");
const { User, Personality } = require("../models");
const { ErrorResponse, SuccessResponse } = require("../utils");

const fetchAllUsers = async (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    console.log("Fetching all users", { page, limit });

    try {
        const users = await User.find({}, { fullName: 1, profileImageURL: 1 })
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const totalUsers = await User.countDocuments();

        if (users.length === 0) {
            SuccessResponse.message = "No users available";
            return res.status(StatusCodes.NOT_FOUND).json(SuccessResponse);
        }

        SuccessResponse.message = "Users fetched successfully";
        SuccessResponse.data = { totalUsers, users };
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        ErrorResponse.error = ["Internal server error"];
        ErrorResponse.message = "Failed to fetch users";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

const fetchAllPersonalities = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    console.log("Fetching Personalities");

    try {
        const personalities = await Personality.find({}, { fullName: 1, profileImageURL: 1 })
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const totalPersonalities = await Personality.countDocuments();

        if (personalities.length === 0) {
            SuccessResponse.message = "No personalities available";
            return res.status(StatusCodes.NOT_FOUND).json(SuccessResponse);
        }

        SuccessResponse.message = "Personalities fetched successfully";
        SuccessResponse.data = { totalPersonalities, personalities };
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error("Error fetching personalities:", error.message);
        ErrorResponse.error = ["Internal server error"];
        ErrorResponse.message = "Failed to fetch personalities";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// New function to fetch user by name
const fetchUserByName = async (req, res) => {
    const { name } = req.params;
    console.log(`Fetching user with name: ${name}`);

    try {
        const user = await User.findOne({ fullName: name }, { knownFor: 1, name: 1, profileImageURL: 1 });

        if (!user) {
            SuccessResponse.message = "No user found with the specified name";
            return res.status(StatusCodes.NOT_FOUND).json(SuccessResponse);
        }

        SuccessResponse.message = "User fetched successfully";
        SuccessResponse.data = user;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error(`Error fetching user by name ${name}:`, error.message);
        ErrorResponse.error = ["Internal server error"];
        ErrorResponse.message = "Failed to fetch user";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// New function to fetch personality by name
const fetchPersonalityByName = async (req, res) => {
    const { name } = req.params;
    console.log(`Fetching personality with name: ${name}`);

    try {
        const personality = await Personality.findOne({ fullName: name }, { knownFor: 1, name: 1, profileImageURL: 1 });

        if (!personality) {
            SuccessResponse.message = "No personality found with the specified name";
            return res.status(StatusCodes.NOT_FOUND).json(SuccessResponse);
        }

        SuccessResponse.message = "Personality fetched successfully";
        SuccessResponse.data = personality;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error(`Error fetching personality by name ${name}:`, error.message);
        ErrorResponse.error = ["Internal server error"];
        ErrorResponse.message = "Failed to fetch personality";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

module.exports = {
    fetchAllUsers,
    fetchAllPersonalities,
    fetchUserByName,
    fetchPersonalityByName
};
