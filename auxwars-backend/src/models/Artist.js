const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: String,
    bio: String,
    genres: [String]
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
