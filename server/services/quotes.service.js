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

        let noMoreResults = false;
        if (quotes.length === 0) {
            return { totalQuotes: 0, quotes, noMoreResults: true }
        }

        const quotesWithLikeCount = quotes.map(quote => ({
            ...quote.toObject(),
            likeCount: quote.likes ? quote.likes.length : 0,
            profileImageURL: quote.authorId.profileImageURL,
            knownFor: quote.authorId.knownFor
        }));

        if (totalQuotes <= (Number(page) - 1) * Number(limit) + quotes.length) {
            noMoreResults = true;
        }
        console.log(quotes[0])
        return { totalQuotes, quotes: quotesWithLikeCount, noMoreResults }

    } catch (error) {
        console.error("Error fetching quotes:", error.message);
        throw new AppError("Internal Server Error", StatusCodes.INTERNAL_SERVER_ERROR)
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

        let noMoreResults = false;
        if (quotes.length === 0) {
            return { totalQuotes: 0, quotes, noMoreResults: true }
        }

        const quotesWithLikeCount = quotes.map(quote => ({
            ...quote.toObject(),
            likeCount: quote.likes.length,
            profileImageURL: quote.authorId.profileImageURL,
            knownFor: quote.authorId.knownFor
        }));

        if (totalQuotes <= (Number(page) - 1) * Number(limit) + quotes.length) {
            noMoreResults = true;
        }

        return {totalQuotes, quotes: quotesWithLikeCount, noMoreResults};
    } catch (error) {
        console.error("Error fetching user quotes:", error.message);
        throw new AppError("Internal Server Error", StatusCodes.INTERNAL_SERVER_ERROR)
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

        let noMoreResults = false;
        if (quotes.length === 0) {
            return { totalQuotes: 0, quotes, noMoreResults: true }
        }
        
        const quotesWithLikeCount = quotes.map(quote => ({
            ...quote.toObject(),
            likeCount: quote.likes.length,
            profileImageURL: quote.authorId.profileImageURL,
            knownFor: quote.authorId.knownFor
        }));

        if (totalQuotes <= (Number(page) - 1) * Number(limit) + quotes.length) {
            noMoreResults = true;
        }

        return { totalQuotes, quotes: quotesWithLikeCount, noMoreResults };
    } catch (error) {
        console.error("Error fetching personality quotes:", error.message);
        throw new AppError("Internal Server Error", StatusCodes.INTERNAL_SERVER_ERROR)
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

        let noMoreResults = false;
        if (quotes.length === 0) {
            return { totalQuotes: 0, quotes, noMoreResults: true }
        }

        const quotesWithLikeCount = quotes.map(quote => ({
            ...quote.toObject(),
            likeCount: quote.likes.length,
            profileImageURL: quote.authorId.profileImageURL,
            knownFor: quote.authorId.knownFor
        }));

        if (totalQuotes <= (Number(page) - 1) * Number(limit) + quotes.length) {
            noMoreResults = true;
        }

        return { totalQuotes, quotes: quotesWithLikeCount, noMoreResults };
    } catch (error) {
        console.error(`Error fetching quotes for author ${fullName}:`, error.message);
        throw new AppError("Internal Server Error", StatusCodes.INTERNAL_SERVER_ERROR)
    }
};


module.exports = {
    fetchQuotes,
    fetchUserQuotes,
    fetchPersonalityQuotes,
    fetchQuotesByFullName
}