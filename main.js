const axios = require('axios');
require('dotenv').config();

// Load environment variables from .env file
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// Function to get the access token from Spotify
const getAccessToken = async () => {
    const response = await axios.post('https://accounts.spotify.com/api/token',
        new URLSearchParams({
            'grant_type': 'client_credentials'
        }), {
        headers: {
            'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    return response.data.access_token;
}

// Function to fetch episode details
const getEpisodeDetails = async (episodeId) => {
    const accessToken = await getAccessToken();

    const response = await axios.get(`https://api.spotify.com/v1/episodes/${episodeId}?market=US`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    return response.data;
}

// Replace with desired episode ID
const episodeId = '0JNWREwGqFabh0s6t7xN25';

getEpisodeDetails(episodeId).then(data => {
    console.log(data);
}).catch(err => {
    console.error('Error fetching episode details:', err);
});