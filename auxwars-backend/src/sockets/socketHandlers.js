const GameSession = require('../models/GameSession');

module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('A user connected');

        // Handler for a vote action
        socket.on('vote', async ({ sessionId, trackId, userId }) => {
            try {
                // Add or update a vote
                const session = await GameSession.findById(sessionId);
                if (!session) {
                    socket.emit('error', 'Session not found');
                    return;
                }

                const existingVote = session.votes.find(v => v.trackId.equals(trackId) && v.userId.equals(userId));
                if (existingVote) {
                    // Update existing vote if necessary, e.g., change of vote or incrementing
                    existingVote.vote++; // Simple increment, adjust according to your game logic
                } else {
                    // Add a new vote
                    session.votes.push({ trackId, userId, vote: 1 });
                }

                await session.save();

                // Notify all clients in the session about the updated votes
                io.to(sessionId).emit('votesUpdated', session.votes.filter(v => v.trackId.equals(trackId)));
            } catch (error) {
                console.error('Voting error:', error);
                socket.emit('error', 'Failed to process vote');
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};
