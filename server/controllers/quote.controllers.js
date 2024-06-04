const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils");
const { QuotesService } = require("../services");

const getQuotes = async (req, res) => {
    console.log("hey from controller")
    try {
        const quotes = await QuotesService.fetchQuotes(req, res);

        if (quotes.length === 0) {
            ErrorResponse.error = "No quotes found";
            ErrorResponse.message = "No quotes available";
            return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }

        SuccessResponse.message = "Quotes fetched successfully";
        SuccessResponse.data = quotes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error("Error fetching quotes:", error.message);
        ErrorResponse.error = "Internal server error";
        ErrorResponse.message = "Failed to fetch quotes";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

module.exports = { getQuotes };
