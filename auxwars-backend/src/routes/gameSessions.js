const express = require('express');

const router = express.Router();
const GameSession = require('../models/GameSession');

// Create Game Session
router.post('/game-sessions', async (req, res) => {
    try {
        const newSession = new GameSession({
            host: req.user._id,  // assuming you have user authentication in place
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
router.get('/game-sessions/:id', async (req, res) => {
    try {
        const session = await GameSession.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ message: 'Game session not found' });
        }
        res.status(200).json(session);
    } catch (error) {
        console.error('Failed to get game session:', error);
        res.status(500).json({ message: 'Failed to get game session' });
    }
});

// Join Game Session
router.post('/game-sessions/:sessionId/join', async (req, res) => {
    try {
        const session = await GameSession.findByIdAndUpdate(req.params.sessionId, {
            $addToSet: { players: req.user._id }  // prevents adding the same user twice
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