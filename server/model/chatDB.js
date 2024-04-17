const mongoose = require('../config/config')

const messageSchema = new mongoose.Schema({

  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'employee' },  

  receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'employee' },

  message: { type: String, required: true },

  isRead: { type: String,
    enum: ['Seen', 'Delivered'],
    default: 'Delivered', },

  } ,
  
  { timestamps: true }
  );

  const chatMessage = new mongoose.model("chat" , messageSchema)

  module.exports =  chatMessage