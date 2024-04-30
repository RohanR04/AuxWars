const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    songs: [{
        song: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'
        },
        votes: Number
    }],
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: Date,
    status: {
        type: String,
        enum: ['active', 'completed', 'scheduled'],
        default: 'scheduled'
    }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
