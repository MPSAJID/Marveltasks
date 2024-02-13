    // document.addEventListener('DOMContentLoaded', function () {   
         document.getElementById('send').addEventListener('click', function () {
        sendMessage({
            name: document.getElementById('name').value,
            message: document.getElementById('message').value
        });
    });

    getMessages();
// });

    // document.getElementById('clear').addEventListener('click',function(){
        
    // });

function addMessages(message) {
    var messagesContainer = document.getElementById('messages');
    var messageElement = document.createElement('div');
    messageElement.innerHTML = `
        <h4>${message.name} : </h4>
        <p>${message.message}</p>
    `;
    messagesContainer.appendChild(messageElement);
}

function getMessages() {
    fetch('http://localhost:3000/messages')
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

function sendMessage(message) {
    fetch('http://localhost:3000/messages', {
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
            // Handle successful response if needed
            console.log(response);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
        document.getElementById('message').value="";
}
