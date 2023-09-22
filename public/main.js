const socket = io();

function sendMessage(e) {
    e.preventDefault();
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();

    if (message !== '') {
        socket.emit('chat message', message);
        messageInput.value = '';
    }

    return false;
}

function appendMessage(data) {
    const messagesContainer = document.getElementById('messages');
    const messageItem = document.createElement('li');
    messageItem.textContent = `${data.username}: ${data.message}`;
    messagesContainer.appendChild(messageItem);
}

socket.on('connect', () => {
    const username = prompt('Please enter your username:');
    socket.emit('join', username);
});

socket.on('user joined', (username) => {
    appendMessage({ username: 'System', message: `${username} joined the chat` });
});

socket.on('chat message', (data) => {
    appendMessage(data);
});

socket.on('user left', (username) => {
    appendMessage({ username: 'System', message: `${username} left the chat` });
});

// document.getElementById('chat-form').addEventListener('submit', (e) => {
//     e.preventDefault();
//     sendMessage();
// });
document.getElementById('chat-form').addEventListener('submit',sendMessage);
