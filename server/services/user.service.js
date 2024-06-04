const fetchAllUsers = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    console.log("Fetching all users");

    try {
        const users = await User.find()
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const totalUsers = await User.countDocuments();

        if (users.length === 0) {
            ErrorResponse.error = ["No users found"];
            ErrorResponse.message = "No users available";
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }

        SuccessResponse.message = "Users fetched successfully";
        SuccessResponse.data = { totalUsers, users };
        SuccessResponse.error = null;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        ErrorResponse.error = ["Internal server error"];
        ErrorResponse.message = "Failed to fetch users";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

module.exports = {
    fetchAllUsers,
}
