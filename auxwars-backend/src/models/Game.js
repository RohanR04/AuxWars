const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSessionSchema = new Schema({
    host: { type: Schema.Types.ObjectId, ref: 'User' },
    players: [{
        player: { type: Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enum: ['host', 'player', 'spectator'], default: 'player' }
    }],
    artist: {
        name: String,
        spotifyArtistId: String // Spotify Artist ID for API integration
    },
    tracks: [{
        title: String,
        spotifyTrackId: String // Spotify Track ID for API integration
    }],
    votes: [{
        trackId: { type: Schema.Types.ObjectId, ref: 'Track' },
        voters: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    }],
    status: { type: String, enum: ['waiting', 'active', 'completed'], default: 'waiting' }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

const GameSession = mongoose.model('GameSession', gameSessionSchema);
module.exports = GameSession;
