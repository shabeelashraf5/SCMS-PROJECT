import mongoose from 'mongoose';

export interface Chat {
    _id: string;
    sender_id: mongoose.Types.ObjectId | string 
    receiver_id: mongoose.Types.ObjectId | string  
    message: string;
    createdAt: Date;
    isRead: 'Seen' | 'Delivered'
    
  }