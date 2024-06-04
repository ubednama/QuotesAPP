const { StatusCodes } = require("http-status-codes");
const { Quote } = require("../models");
const { SuccessResponse, ErrorResponse } = require("../utils");

const fetchQuotes = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    console.log("hey from service")
    try {
        const quotes = await Quote.find()
            .populate('authorId')
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const totalQuotes = await Quote.countDocuments();

        if (quotes.length === 0) {
            ErrorResponse.error = "No quotes found";
            ErrorResponse.message = "No quotes available";
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }

        SuccessResponse.message = "Quotes fetched successfully";
        SuccessResponse.data = {totalQuotes, quotes};
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error("Error fetching quotes:", error.message);
        ErrorResponse.error = "Internal server error";
        ErrorResponse.message = "Failed to fetch quotes";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};


const fetchUserQuotes = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    console.log("Fetching user quotes");

    try {
        const quotes = await Quote.find({ authorType: 'User' })
            .populate('authorId')
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const totalQuotes = await Quote.countDocuments({ authorType: 'User' });

        if (quotes.length === 0) {
            ErrorResponse.error = ["No user quotes found"];
            ErrorResponse.message = "No user quotes available";
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }

        SuccessResponse.message = "User quotes fetched successfully";
        SuccessResponse.data = { totalQuotes, quotes };
        SuccessResponse.error = null;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error("Error fetching user quotes:", error.message);
        ErrorResponse.error = ["Internal server error"];
        ErrorResponse.message = "Failed to fetch user quotes";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};


const fetchPersonalityQuotes = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    console.log("Fetching personality quotes");

    try {
        const quotes = await Quote.find({ authorType: 'Personality' })
            .populate('authorId')
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const totalQuotes = await Quote.countDocuments({ authorType: 'Personality' });

        if (quotes.length === 0) {
            ErrorResponse.error = ["No personality quotes found"];
            ErrorResponse.message = "No personality quotes available";
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }

        SuccessResponse.message = "Personality quotes fetched successfully";
        SuccessResponse.data = { totalQuotes, quotes };
        SuccessResponse.error = null;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error("Error fetching personality quotes:", error.message);
        ErrorResponse.error = ["Internal server error"];
        ErrorResponse.message = "Failed to fetch personality quotes";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

const fetchQuotesByFullName = async (req, res) => {
    const { fullname } = req.params;
    const { page = 1, limit = 20 } = req.query;

    // Replace underscores with spaces to get the actual full name
    const fullName = fullname.replace(/_/g, ' ');
    console.log(`Fetching quotes for: ${fullName}`);

    try {
        const quotes = await Quote.find({ author: fullName })
            .populate('authorId')
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const totalQuotes = await Quote.countDocuments({ author: fullName });

        if (quotes.length === 0) {
            ErrorResponse.error = ["No quotes found for the specified author"];
            ErrorResponse.message = "No quotes available for this author";
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }

        SuccessResponse.message = "Quotes fetched successfully for the author";
        SuccessResponse.data = { totalQuotes, quotes };
        SuccessResponse.error = null;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error(`Error fetching quotes for author ${fullName}:`, error.message);
        ErrorResponse.error = ["Internal server error"];
        ErrorResponse.message = "Failed to fetch quotes for the author";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};


module.exports = {
    fetchQuotes,
    fetchUserQuotes,
    fetchPersonalityQuotes,
    fetchQuotesByFullName
}