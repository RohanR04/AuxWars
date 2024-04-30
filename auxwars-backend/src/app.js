const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Test Route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
