import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div className="dashboard">
            <h1>Welcome to Aux Wars</h1>
            <div>
                <Link to="/game">Start New Game</Link>
                {/* You could add more links or buttons here for other actions */}
            </div>
        </div>
    );
}

export default Dashboard;
