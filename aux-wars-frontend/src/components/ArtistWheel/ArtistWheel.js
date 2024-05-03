import React, { useState } from 'react';
import axios from 'axios';
import './ArtistWheel.css';  // Assuming the CSS import is correct

function ArtistWheel() {
    const [artistInfo, setArtistInfo] = useState({ name: "Spin the wheel to see the artist!", bio: "", genres: [] });
    const [spinning, setSpinning] = useState(false);

    const spinWheel = async () => {
        setSpinning(true);
        try {
            // Adjust the API endpoint as necessary
            const response = await axios.get('/api/random-artist');
            setTimeout(() => {
                // Assume the response data structure is as shown in your message
                setArtistInfo(response.data);
                setSpinning(false);
            }, 2000); // Simulate a spinning delay
        } catch (error) {
            console.error('Error fetching artist:', error);
            setArtistInfo({ name: 'Failed to load artist', bio: '', genres: [] });
            setSpinning(false);
        }
    };

    return (
        <div className="artist-wheel">
            <h2>Artist: {artistInfo.name}</h2>
            <p>{artistInfo.bio}</p>
            <div>
                Genres: {artistInfo.genres.join(', ')}
            </div>
            <button onClick={spinWheel} disabled={spinning}>
                {spinning ? 'Spinning...' : 'Spin'}
            </button>
        </div>
    );
}

export default ArtistWheel;
