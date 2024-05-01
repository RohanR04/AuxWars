const axios = require('axios');
const querystring = require('querystring');

const getAuthHeaders = (accessToken) => {
    return { Authorization: `Bearer ${accessToken}` };
};

const fetchArtistDiscography = async (artistId, accessToken) => {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
            headers: getAuthHeaders(accessToken),
            params: {
                include_groups: 'album,single,appears_on,compilation',
                limit: 50
            }
        });
        return response.data.items;
    } catch (error) {
        console.error('Error fetching artist discography:', error);
        return null;
    }
};

async function fetchArtistDetails(artistId, accessToken) {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching artist details:', error);
        return null;
    }
}

async function searchTracks(query, accessToken) {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/search`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: {
                q: query,
                type: 'track',
                limit: 20
            }
        });
        return response.data.tracks.items;
    } catch (error) {
        console.error('Error searching for tracks:', error);
        return null;
    }
}

async function fetchArtistTopTracks(artistId, country, accessToken) {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { country: country }
        });
        return response.data.tracks;
    } catch (error) {
        console.error('Error fetching artist top tracks:', error);
        return null;
    }
}

async function createPlaylist(userId, playlistName, accessToken) {
    try {
        const response = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            name: playlistName,
            description: 'Created by Aux Wars',
            public: false
        }, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating playlist:', error);
        return null;
    }
}

async function addTracksToPlaylist(playlistId, trackUris, accessToken) {
    try {
        const response = await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            uris: trackUris
        }, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding tracks to playlist:', error);
        return null;
    }
}


module.exports = {
    fetchArtistDiscography
};
