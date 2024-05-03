import React from 'react';

function TrackList() {
    const tracks = ["Song 1", "Song 2", "Song 3"]; // This would be fetched from the backend

    return (
        <div className="track-list">
            <ul>
                {tracks.map(track => <li key={track}>{track}</li>)}
            </ul>
        </div>
    );
}

export default TrackList;
