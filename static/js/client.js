//initialize the socket
//this will make a connection with the server
let socket = io()

let displayChat = document.getElementById('displayChat') 
let chatMessageTextBox = document.getElementById('chatMessageTextBox')
let sendButton = document.getElementById('sendButton')
let userNameHF = document.getElementById('usernameHF')
let username = usernameHF.value



sendButton.addEventListener('click', () => {

    let chatMessage = chatMessageTextBox.value 
    socket.emit('tripChat',chatMessage)
})


//listen for a particular event/channel
socket.on('tripChat',(message) => {
    let messageDisplay = `<p class="lead">${username}: ${message}</p>`
    displayChat.insertAdjacentHTML('beforeend', messageDisplay)

})