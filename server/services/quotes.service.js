const { StatusCodes } = require("http-status-codes");
const { Quote } = require("../models");

const fetchQuotes = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    console.log("hey from service")
    try {
        const quotes = await Quote.find()
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .populate('authorId', 'profileImageURL knownFor');

        console.log("Quotes:", quotes[0]);

        const totalQuotes = await Quote.countDocuments();

        if (quotes.length === 0) {
            return quotes;
        }

        const quotesWithLikeCount = quotes.map(quote => ({
            ...quote.toObject(),
            likeCount: quote.likes ? quote.likes.length : 0,
            profileImageURL: quote.authorId.profileImageURL,
            knownFor: quote.authorId.knownFor
        }));

        let noMoreResults = false;
        if (totalQuotes <= (Number(page) - 1) * Number(limit) + quotes.length) {
            noMoreResults = true;
        }
        console.log(quotes[0])
        return { totalQuotes, quotes: quotesWithLikeCount, noMoreResults }

    } catch (error) {
        console.error("Error fetching quotes:", error.message);
        throw new AppError("Failed to fetch quotes", StatusCodes.INTERNAL_SERVER_ERROR)
    }
};


const fetchUserQuotes = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    console.log("Fetching user quotes");

    try {
        const quotes = await Quote.find({ authorType: 'User' })
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .populate('authorId', 'profileImageURL knownFor');

        console.log(quotes)

        const totalQuotes = await Quote.countDocuments({ authorType: 'User' });

        if (quotes.length === 0) {
            console.log("empty")
            SuccessResponse.message = "No user quotes available";
            return res.status(StatusCodes.NOT_FOUND).json(SuccessResponse);
        }

        const quotesWithLikeCount = quotes.map(quote => ({
            ...quote.toObject(),
            likeCount: quote.likes.length,
            profileImageURL: quote.authorId.profileImageURL,
            knownFor: quote.authorId.knownFor
        }));

        SuccessResponse.message = "User quotes fetched successfully";
        SuccessResponse.data = { totalQuotes, quotes: quotesWithLikeCount};
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
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .populate('authorId', 'profileImageURL knownFor');

        const totalQuotes = await Quote.countDocuments({ authorType: 'Personality' });

        if (quotes.length === 0) {
            SuccessResponse.message = "No personality quotes available";
            return res.status(StatusCodes.NOT_FOUND).json(SuccessResponse);
        }

        const quotesWithLikeCount = quotes.map(quote => ({
            ...quote.toObject(),
            likeCount: quote.likes.length,
            profileImageURL: quote.authorId.profileImageURL,
            knownFor: quote.authorId.knownFor
        }));

        SuccessResponse.message = "Personality quotes fetched successfully";
        SuccessResponse.data = { totalQuotes, quotes: quotesWithLikeCount };
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
            .populate('authorId', 'profileImageURL knownFor')
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const totalQuotes = await Quote.countDocuments({ author: fullName });

        if (quotes.length === 0) {
            SuccessResponse.message = "No quotes available for this author";
            return res.status(StatusCodes.NOT_FOUND).json(SuccessResponse);
        }

        const quotesWithLikeCount = quotes.map(quote => ({
            ...quote.toObject(),
            likeCount: quote.likes.length,
            profileImageURL: quote.authorId.profileImageURL,
            knownFor: quote.authorId.knownFor
        }));

        SuccessResponse.message = "Quotes fetched successfully for the author";
        SuccessResponse.data = { totalQuotes, quotes: quotesWithLikeCount};
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