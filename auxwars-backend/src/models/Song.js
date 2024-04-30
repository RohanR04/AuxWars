const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    spotifyTrackId: String,  // Optional: to integrate with Spotify
    duration: Number,        // Optional: duration of the track in milliseconds
    albumName: String        // Optional: name of the album the track is from
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
