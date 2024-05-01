const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const router = express.Router();

// Function to exchange the authorization code for an access token
async function exchangeCodeForToken(code) {
    const credentials = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
    try {
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI
        }), {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        // Return both the access token and the refresh token
        return {
            accessToken: tokenResponse.data.access_token,
            refreshToken: tokenResponse.data.refresh_token,
            expiresIn: tokenResponse.data.expires_in
        };
    } catch (error) {
        console.error('Failed to retrieve access token:', error.response ? error.response.data : error.message);
        throw new Error('Failed to retrieve access token.');
    }
}

async function storeRefreshToken(userId, refreshToken) {
    // Dummy function to represent storing the refresh token securely
    // Implement this according to your database setup
    await Database.saveRefreshToken(userId, refreshToken);
}

async function refreshAccessToken(refreshToken) {
    const credentials = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        }), {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return {
            accessToken: response.data.access_token,
            expiresIn: response.data.expires_in
        };
    } catch (error) {
        console.error('Failed to refresh access token:', error.response ? error.response.data : error.message);
        throw new Error('Failed to refresh access token.');
    }
}


// Route that handles the OAuth callback
router.get('/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const { accessToken, refreshToken, expiresIn } = await exchangeCodeForToken(code);
        await storeRefreshToken(req.user.id, refreshToken);  // Assuming user identification available --- Not yet
        // Redirect with new access token or handle session
        res.redirect(`/dashboard?token=${encodeURIComponent(accessToken)}`);
    } catch (error) {
        console.error('Error during token exchange:', error);
        res.redirect(`/login?error=${encodeURIComponent("Authentication failed")}`);
    }
});

module.exports = router;
