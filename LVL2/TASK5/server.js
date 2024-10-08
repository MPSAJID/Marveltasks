const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
require('dotenv').config();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());



const Message = mongoose.model('Message',{ name : String  ,message : String });

app.get('/messages', (req, res) => {
  Message.find({})
  .then(messages => {
    res.send(messages);
  })
  .catch(error => {
    console.error(error);
  });
})

app.post('/messages', (req, res) => {
  const message = new Message(req.body);
  message.save()
  .then(()=>{
    res.sendStatus(200);
    io.emit('message', req.body); 
    })
    .catch(()=>{
      res.sendStatus(500);
    })
})
app.delete('/messages/clr', async (req, res) => {
  try {
      const cleared = await Message.deleteMany();
      if (cleared) {
          console.log('Chat cleared succesfully!');
          io.emit('chat_cleared');
          res.sendStatus(200);
      }
  } catch (err) {
      console.error('Error deleting items:', err);
      res.status(500).json({ message: 'Internal server error' });
  }
});


io.on('connection', () =>{
  console.log('a user is connected')
 })

 mongoose.connect(process.env.MONGODB_URL);



const  server = http.listen(3001, () => {
  console.log('server is running on port', server.address().port);
});