const voteSchema = new Schema({
    trackId: { type: Schema.Types.ObjectId, ref: 'Track' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    vote: { type: Number, default: 1 } // Assuming a simple +1 vote per click; extend as needed
});

const gameSessionSchema = new Schema({
    host: { type: Schema.Types.ObjectId, ref: 'User' },
    players: [{
        player: { type: Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enum: ['host', 'player', 'spectator'], default: 'player' }
    }],
    artist: {
        name: String,
        spotifyArtistId: String
    },
    tracks: [{
        title: String,
        spotifyTrackId: String
    }],
    votes: [voteSchema],
    status: { type: String, enum: ['waiting', 'active', 'completed'], default: 'waiting' }
}, {
    timestamps: true
});

const GameSession = mongoose.model('GameSession', gameSessionSchema);
module.exports = GameSession;
