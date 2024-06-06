const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils");
const { QuotesService } = require("../services");

const getQuotes = async (req, res) => {
    console.log("hey from controller")
    try {
        const { totalQuotes, quotes, noMoreResults } = await QuotesService.fetchQuotes(req, res);

        if (quotes.length === 0) {
            SuccessResponse.message = "No quotes available";
            return res.status(StatusCodes.NOT_FOUND).json(SuccessResponse);
        }

        SuccessResponse.message = "Quotes fetched successfully";
        if (noMoreResults) {
            SuccessResponse.message = "No more results";
        }
        SuccessResponse.data = { totalQuotes, quotes};
        return res.status(StatusCodes.OK).json(SuccessResponse);

    } catch (error) {
        console.error("Error fetching quotes:", error.message);
        ErrorResponse.error = "Internal server error";
        ErrorResponse.message = "Failed to fetch quotes";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

const getUserQuotes = async (req, res) => {
    try {
        const quotes = await QuotesService.fetchUserQuotes(req, res);

        console.log(quotes);

        if (quotes.length === 0) {
            SuccessResponse.message = "No user quotes available";
            return res.status(StatusCodes.NOT_FOUND).json(SuccessResponse);
        }

        SuccessResponse.message = "User quotes fetched successfully";
        SuccessResponse.data = quotes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error("Error fetching user quotes:", error.message);
        ErrorResponse.error = "Internal server error";
        ErrorResponse.message = "Failed to fetch user quotes";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

const getPersonalityQuotes = async (req, res) => {
    try {
        const quotes = await QuotesService.fetchPersonalityQuotes(req, res);

        if (quotes.length === 0) {
            SuccessResponse.message = "No personality quotes available";
            return res.status(StatusCodes.NOT_FOUND).json(SuccessResponse);
        }

        SuccessResponse.message = "Personality quotes fetched successfully";
        SuccessResponse.data = quotes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error("Error fetching personality quotes:", error.message);
        ErrorResponse.error = "Internal server error";
        ErrorResponse.message = "Failed to fetch personality quotes";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

const getQuotesByFullName = async (req, res) => {
    try {
        const quotes = await QuotesService.fetchQuotesByFullName(req, res);

        if (quotes.length === 0) {
            SuccessResponse.message = "No quotes available for this author";
            return res.status(StatusCodes.NOT_FOUND).json(SuccessResponse);
        }

        SuccessResponse.message = "Quotes fetched successfully for the author";
        SuccessResponse.data = quotes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error("Error fetching quotes for author:", error.message);
        ErrorResponse.error = "Internal server error";
        ErrorResponse.message = "Failed to fetch quotes for the author";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

module.exports = {
    getQuotes,
    getUserQuotes,
    getPersonalityQuotes,
    getQuotesByFullName
};
