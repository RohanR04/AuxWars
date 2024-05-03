import React from 'react';
import ArtistWheel from '../ArtistWheel/ArtistWheel';
import TrackList from '../TrackList/TrackList';
import Vote from '../Vote/Vote';

function Game() {
    return (
        <div className="game">
            <ArtistWheel />
            <TrackList />
            <Vote />
        </div>
    );
}

export default Game;
