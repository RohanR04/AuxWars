const express = require('express');

const router = express.Router();
const GameSession = require('../models/GameSession');

// Optional authentication middleware placeholder
const optionalAuth = (req, res, next) => {
    // Future: Replace with actual authentication logic
    // For now, it checks if user information is included in the headers or body
    if (req.headers['user-id']) {
        req.user = { _id: req.headers['user-id'] };  // Simulate setting user from header
    }
    next();
};

// Middleware to apply optional authentication to all routes in this router
router.use(optionalAuth);

// Create Game Session
router.post('/game-sessions', async (req, res) => {
    const hostId = req.user ? req.user._id : null;
    try {
        const newSession = new GameSession({
            host: hostId,
            status: 'waiting'
        });
        await newSession.save();
        res.status(201).json(newSession);
    } catch (error) {
        console.error('Failed to create game session:', error);
        res.status(500).json({ message: 'Failed to create game session' });
    }
});

// Get Game Session by ID
router.get('/game-sessions/:sessionId', async (req, res) => {
    try {
        const session = await GameSession.findById(req.params.sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Game session not found' });
        }
        res.json(session);
    } catch (error) {
        console.error('Failed to retrieve game session:', error);
        res.status(500).json({ message: 'Failed to retrieve game session' });
    }
});

// Join Game Session
router.post('/game-sessions/:sessionId/join', async (req, res) => {
    const userId = req.user ? req.user._id : req.body.userId;  // Use authenticated user ID or provided user ID
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required to join the session' });
    }
    try {
        const session = await GameSession.findByIdAndUpdate(req.params.sessionId, {
            $addToSet: { players: userId }
        }, { new: true });
        res.json(session);
    } catch (error) {
        console.error('Failed to join game session:', error);
        res.status(500).json({ message: 'Failed to join game session' });
    }
});

// Update Game Session
router.put('/game-sessions/:sessionId', async (req, res) => {
    try {
        const sessionUpdate = await GameSession.findByIdAndUpdate(req.params.sessionId, req.body, { new: true });
        res.json(sessionUpdate);
    } catch (error) {
        console.error('Failed to update game session:', error);
        res.status(500).json({ message: 'Failed to update game session' });
    }
});

// End Game Session
router.post('/game-sessions/:sessionId/end', async (req, res) => {
    try {
        const session = await GameSession.findByIdAndUpdate(req.params.sessionId, {
            status: 'completed',
            endTime: new Date()
        }, { new: true });
        res.json(session);
    } catch (error) {
        console.error('Failed to end game session:', error);
        res.status(500).json({ message: 'Failed to end game session' });
    }
});

// List All Game Sessions
router.get('/game-sessions', async (req, res) => {
    try {
        const sessions = await GameSession.find({});
        res.json(sessions);
    } catch (error) {
        console.error('Failed to list game sessions:', error);
        res.status(500).json({ message: 'Failed to list game sessions' });
    }
});


module.exports = router;