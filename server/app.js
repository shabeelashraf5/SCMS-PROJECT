let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors')
const bodyparser = require('body-parser')
let http = require ('http')
const dotenv = require('dotenv').config()
console.log(dotenv.parsed)
const chatMessage = require('./model/chatDB')
const collectionemployee = require('./model/employeeDB')

let app = express();

let server = http.createServer(app)


//const io = socketIO(server);

let employeeRouter = require('./routes/employee');
let adminRouter = require('./routes/admin');
let salesRouter = require('./routes/sales');
let purchaseRouter = require('./routes/purchase');
let warehouseRouter = require('./routes/warehouse');
let accountingRouter = require('./routes/accounting');
let shipmentRouter = require('./routes/shipment');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


app.use('/api/portal', employeeRouter);
app.use('/api/admin', adminRouter);
app.use('/api/portal/sales', salesRouter);
app.use('/api/portal/purchase', purchaseRouter);
app.use('/api/portal/warehouse', warehouseRouter);
app.use('/api/portal/accounting', accountingRouter);
app.use('/api/portal/shipment', shipmentRouter);




const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    
  }
});


const usp = io.of('/user-namespace')

usp.on('connection', async function(socket){

  console.log('User Connected')

  console.log(socket.handshake.auth.token)

  
  socket.on('disconnect', async function(){

    console.log('User Disconnect')
  }) 

  
  socket.on('chatMessage', function(message){
    console.log('Message received:', message);
    usp.emit('chatMessage', message); 
      //socket.broadcast.emit('loadNewChat', message)
  });

  
  socket.on('existsChat', async function(data) {
    try {
      const { sender_id, receiver_id } = data;
      console.log(`Fetching existing chats for sender_id: ${sender_id} and receiver_id: ${receiver_id}`);
      const chats = await chatMessage.find({
        $or: [
          { sender_id: data.sender_id, receiver_id: data.receiver_id },
          { sender_id: data.receiver_id, receiver_id: data.sender_id }
        ]
      }).sort({ createdAt: 1 }); // Sort chats by creation time if necessary
      socket.emit('loadChats', { chats });
      console.log('Existing chats:', chats);
    } catch (error) {
      console.error('Error fetching chats:', error);
      // Handle error appropriately, e.g., emit an error event to the client
      socket.emit('loadChatError', { error: 'Error fetching chats' });
    }
  });



  socket.on('error', function(err){
    console.error('Socket error:', err);
});


})



app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


server.listen(process.env.PORT_NUMBER, () => {
  console.log('The Server Connected')
})


/*
io.on('connection', (socket) => {
  socket.on('join', (data) => {
    socket.join(data.room)
    socket.broadcast.to(data.room).emit('User Joined')
  })
  socket.on('message' , (data) =>{
    io.in(data.room).emit('new message', {user: data.user, message: data.message})
  })
})*/
  

  
 // module.exports = app;