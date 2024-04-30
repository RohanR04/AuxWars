require('dotenv').config({ path: '/Users/rohanregi/Desktop/AUXWars/AuxWars/auxwars-backend/.env' });
const mongoose = require('mongoose');
const Artist = require('../models/Artist');

async function seedDB() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully.');

        // Define artist data
        const artists = [
            { name: 'Taylor Swift', bio: 'American singer-songwriter.', genres: ['pop', 'country', 'rock'] },
            { name: 'Drake', bio: 'Canadian rapper, singer, and actor.', genres: ['hip hop', 'rap'] },
            { name: 'The Weeknd', bio: 'Canadian singer, songwriter, and record producer.', genres: ['R&B', 'pop'] }
        ];

        // Clear the collection if you don't want duplicates
        await Artist.deleteMany({});
        console.log('Artists collection cleared.');

        // Insert new artists
        await Artist.insertMany(artists);
        console.log('New artists added successfully.');
    } catch (error) {
        console.error('Failed to seed database:', error);
    } finally {
        // Close the database connection
        mongoose.disconnect();
        console.log('MongoDB disconnected.');
    }
}

seedDB();
