// Load environment variables first
require('dotenv').config({ path: '/Users/rohanregi/Documents/GitHub/AuxWars/auxwars-backend/.env' });
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const artistRoutes = require('./routes/gameRoutes');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
const gameSessionsRouter = require('./routes/gameSessions');
const socketIo = require('socket.io');
const setupSocketHandlers = require('./sockets/socketHandlers');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

setupSocketHandlers(io);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
console.log("URI:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/', authRoutes);
app.use('/', indexRoutes);
app.use('/api', artistRoutes);
app.use('/api/game-sessions', gameSessionsRouter);

// Socket.IO connection and event handling
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinSession', ({ sessionId, userId }) => {
        console.log(`User ${userId} joined session ${sessionId}`);
        socket.join(sessionId);
    });

    socket.on('leaveSession', ({ sessionId, userId }) => {
        console.log(`User ${userId} left session ${sessionId}`);
        socket.leave(sessionId);
    });

    socket.on('voteSong', ({ sessionId, songId, userId }) => {
        console.log(`User ${userId} voted for song ${songId} in session ${sessionId}`);
        // Broadcast vote to all clients in the session room
        io.to(sessionId).emit('songVoted', { songId, userId });
    });

    socket.on('sendMessage', ({ sessionId, message, userId }) => {
        // Broadcast message to all clients in the session room
        io.to(sessionId).emit('newMessage', { message, userId });
        console.log(`Message from ${userId} in session ${sessionId}: ${message}`);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Error Handling Middleware
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
