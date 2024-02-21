var socket = io();
socket.on('message', addMessages)
    
    // document.addEventListener('DOMContentLoaded', function () {   
         document.getElementById('send').addEventListener('click', function () {
        sendMessage({
            name: document.getElementById('name').value,
            message: document.getElementById('message').value
        });
    });

    getMessages();
// });

    document.getElementById('clear').addEventListener('click',function(){     
       clearchat(); 
    });

function addMessages(message) {
    var messagesContainer = document.getElementById('messages');
    var messageElement = document.createElement('div');
    messageElement.innerHTML = `
        <h4>${message.name} : </h4>
        <p>${message.message}</p>
    `;
    messagesContainer.appendChild(messageElement);
}

async function getMessages() {
    await fetch('http://localhost:3001/messages')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(addMessages);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

async function sendMessage(message) {
   await fetch('http://localhost:3001/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
        document.getElementById('message').value="";
}

async function clearchat() {
    
    if (confirm("Are you sure you want to clear the chat? This action cannot be undone.")) {
        try {
        const response = await fetch('http://localhost:3001/messages/clr', {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('Chat cleared successfully');
            
            socket.emit('chat_cleared');
        } else {
            console.error('Failed to clear chat');
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
}
