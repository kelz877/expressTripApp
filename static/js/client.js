//initialize the socket
//this will make a connection with the server
let socket = io()

let displayChat = document.getElementById('displayChat') 
let chatMessageTextBox = document.getElementById('chatMessageTextBox')
let sendButton = document.getElementById('sendButton')
let userNameHF = document.getElementById('usernameHF')
let username = usernameHF.value
let userCountDiv = document.getElementById('userCountDiv')

socket.on('userCount', function(data){
    console.log(data.userCount)
    let userDisplay = `<p>There are ${data.userCount} users in the chat!</p>`
    userCountDiv.insertAdjacentHTML('beforeend', userDisplay)
})

sendButton.addEventListener('click', () =>{
    let chatMessage = {name: username, message: chatMessageTextBox.value}
    socket.emit('tripChat',chatMessage)
})


//listen for a particular event/channel
socket.on('tripChat',(chatMessage) => {
    let messageDisplay = `<p class="lead">${chatMessage.name ? chatMessage.name : 'Friend'}:  ${chatMessage.message}</p>`
    displayChat.insertAdjacentHTML('beforeend', messageDisplay)

})

