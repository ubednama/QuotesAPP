const mongoose = require('mongoose');
const { ENUMS, Utils, ErrorMessage } = require('../utils');

const UserSchema = new mongoose.Schema({
    fullName: { 
        type: String,
        required: true,
        // minLength: [3, ErrorMessage.fullMinLengthError],
        // maxLength: [50, ErrorMessage.fullMaxLengthError]
    }, email: { 
        type: String,
        required: true,
        unique: true,
        // match: [Utils.emailRegex, ErrorMessage.emailFormatError]
    }, password: { 
        type: String,
        required: true,
        // match: [Utils.passwordRegex, ErrorMessage.passwordFormatError]
    }, profileImageURL: {
        type: String
    }, knownFor: {
        type: String,
        required: true
    }, gender: {
        type: String,
        enum: ENUMS.GENDER_ENUM,
        default: "Don't want to specify"
    }, quotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quote'
    }], savedQuotes: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quote'
    }], likedQuotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quote'
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

const User = mongoose.model('User', UserSchema);

module.exports = User;