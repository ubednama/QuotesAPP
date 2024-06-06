const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    authorType: {
        type: String,
        enum: ['User', 'Personality'],
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'authorType',
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: '',
        maxLength: [50]
    },
    source: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: null
    },
    tags: {
        type: [String],
        default: []
    },
    language: {
        type: String,
        default: 'English'
    }, likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }], 
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
