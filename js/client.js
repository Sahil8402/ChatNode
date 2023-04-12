const socket = io("http://localhost:8000");

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var sound = new Audio('sound.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        sound.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`<i><b>you: </b>${message}</i>`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`<b><i>${name} joined the chat</i></b>`, 'right')
});
socket.on('receive', data => {
    append(`<i><b>${data.name}:</b> ${data.message}</i>`, 'left');
})
socket.on('left', name => {
    append(`<b><i>${name} left the chat</i></b>`, 'right');
})