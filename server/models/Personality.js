const mongoose = require("mongoose");

const personalitySchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    profileURL: {
        type: String,
        required: true
    },
    knownFor: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    }, quotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quote'
    }],
})

const Personality = mongoose.model('Personality', personalitySchema);

module.exports = Personality;