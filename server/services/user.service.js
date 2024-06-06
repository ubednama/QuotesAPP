const { StatusCodes } = require("http-status-codes");
const { User, Personality } = require("../models");

const fetchAllUsers = async (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    console.log("Fetching all users", { page, limit });

    try {
        const users = await User.find({}, { fullName: 1, profileImageURL: 1 })
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const totalUsers = await User.countDocuments();
        return { totalUsers, users}
    } catch (error) {
        console.error("Error fetching users:", error.message);
        throw new AppError("Internal server error",StatusCodes.INTERNAL_SERVER_ERROR);
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

        return { totalPersonalities, personalities };
    } catch (error) {
        console.error("Error fetching personalities:", error.message);
        throw new AppError("Internal server error", StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

const fetchUserByName = async (req, res) => {
    const { name } = req.params;
    console.log(`Fetching user with name: ${name}`);

    try {
        const user = await User.findOne({ fullName: name }, { knownFor: 1, name: 1, profileImageURL: 1 });

        if (!user) {
            return [];
        }
        return user;
    } catch (error) {
        console.error(`Error fetching user by name ${name}:`, error.message);
        throw new AppError("Internal server error", StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

const fetchPersonalityByName = async (req, res) => {
    const { name } = req.params;
    console.log(`Fetching personality with name: ${name}`);

    try {
        const personality = await Personality.findOne({ fullName: name }, { knownFor: 1, name: 1, profileImageURL: 1 });

        if (!personality) {
            return [];
        }

        return personality;
    } catch (error) {
        console.error(`Error fetching personality by name ${name}:`, error.message);
        throw new AppError("Internal server error", StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {
    fetchAllUsers,
    fetchAllPersonalities,
    fetchUserByName,
    fetchPersonalityByName
};
