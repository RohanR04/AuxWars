// Load environment variables first
require('dotenv').config({ path: '/Users/rohanregi/Documents/GitHub/AuxWars/auxwars-backend/.env' });
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const artistRoutes = require('./routes/gameRoutes');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/authRoutes'); // Import the router


const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// MongoDB Connection
console.log("URI:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/', authRoutes); // Use the router
app.use('/', indexRoutes);
app.use('/api', artistRoutes);

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('a user connected');
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
