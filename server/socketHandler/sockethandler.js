
const chatMessage = require('../model/chatDB')

/*

function socketHandler(io) {
    io.on('connection', (socket) => {
      console.log('New client connected');
  
      // Load previous messages
      chatMessage.find().limit(10).sort({ createdAt: -1 }).then((messages) => {
        socket.emit('load messages', messages.reverse());
      }).catch((error) => {
        console.error('Error loading messages:', error);
      });
  
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
  
      socket.on('new message', (data) => {
        const message = new chatMessage({
          username: data.username,
          text: data.text,
        });
  
        message.save().then(() => {
          io.emit('new message', message);
        }).catch((error) => {
          console.error('Error saving message:', error);
        });
      });
    });
  } 
  
  module.exports = socketHandler; */