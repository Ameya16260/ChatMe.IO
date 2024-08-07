const express = require('express');
const app = express();
const port = 4000;
const http = require('http').Server(app);
const cors = require('cors');
app.use(cors());

let users = []; // Correct the variable name to `users`
let messages =[];
const socketIO = require('socket.io')(http, {
  cors: {
    origin: ["https://chatmeio.netlify.app","http://localhost:3000","https://66b3468f0ec52b0008f29c42--chatmeio.netlify.app","https://66b3490ff0adc800089c8c7d--chatmeio.netlify.app"],
  },
});

socketIO.on('connection', (socket) => {
  socketIO.emit('newUserResponse', users);
  console.log(`⚡: ${socket.id} user just connected!`);
  console.log(users);
  
  socket.on('message', (data) => {
    console.log(data);
    messages.push(data);
    socketIO.emit('response', messages);
  });
  socket.on('newUserSignIn', (data) => {
    console.log(data);
    socketIO.emit('newUserResponse', users);
    // socketIO.emit('response', data);
  });
  socket.on('userLeftChat',(data)=>{
    console.log(data)
    users=users.filter(item => item.USERNAME!==data.UserName);
    console.log(users);
    socketIO.emit('newUserResponse', users);
  })
  socket.on('userTyping',(data)=>{
    socket.broadcast.emit('typingResponse', data)
  })
  socket.on('newUser', (data) => {
    users.push(data);
    socketIO.emit('newUserResponse',users);
    socketIO.emit('response', messages);
      
    console.log(data);
    console.log(users);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter(user => user.socketID !== socket.id); // Remove disconnected user
    socketIO.emit('newUserResponse', users); // Update client with current users
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'hello world',
  });
});

http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
