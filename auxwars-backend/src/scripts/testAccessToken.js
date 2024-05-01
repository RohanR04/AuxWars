require('dotenv').config({ path: '/Users/rohanregi/Documents/GitHub/AuxWars/auxwars-backend/.env' });
const axios = require('axios');
const querystring = require('querystring');
const clientID = process.env.SPOTIFY_CLIENT_ID;
console.log(`Client ID: ${clientID}, Client Secret: ${process.env.SPOTIFY_CLIENT_SECRET}`);


async function getSpotifyAccessToken() {
    const credentials = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: 'client_credentials'
        }), {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log('Access Token:', response.data.access_token);
        return response.data.access_token;
    } catch (error) {
        console.error('Failed to retrieve Spotify access token:', error);
        return null;
    }
}

getSpotifyAccessToken();
