const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());



const Message = mongoose.model('Message',{ name : String  ,message : String });
// const Message = require('./models/Message');

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
  var message = new Message(req.body);
  message.save()
    .then(()=>{
        res.sendStatus(500);
        io.emit('message', req.body); 1
    })
    .catch(()=>{
        res.sendStatus(200);
    })
})

io.on('connection', () =>{
  console.log('a user is connected')
 })

 mongoose.connect('mongodb+srv://admin1:atlasadmin@cluster0.bxwjp6i.mongodb.net/cdb');



const  server = http.listen(3001, () => {
  console.log('server is running on port', server.address().port);
});