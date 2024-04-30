const Artist = require('../models/Artist');

exports.getRandomArtist = async function (req, res) {
    try {
        const count = await Artist.countDocuments();
        if (count === 0) {
            return res.status(404).send("No artists found");
        }
        const random = Math.floor(Math.random() * count);
        const artist = await Artist.findOne().skip(random);

        res.send(artist);
    } catch (error) {
        console.error("Error retrieving an artist:", error);
        res.status(500).send("Error retrieving an artist: " + error);
    }
};
