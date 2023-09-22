const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');



const app = express();
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 处理根路径的请求
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 启动服务器

const host = '192.168.2.22';
const port = '3000'
const server = app.listen(port, host, () => {
    console.log(`Server is running on ${host}:${port}`);
});

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (username) => {
        socket.username = username;
        io.emit('user joined', username);
    });

    socket.on('chat message', (message) => {
        io.emit('chat message', { username: socket.username, message: message });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        io.emit('user left', socket.username);
    });
});

