import mongoose from 'mongoose';
import { ChatStatus } from '../enums/chat-status.enum';

export interface Chat {
    _id: string;
    sender_id: mongoose.Types.ObjectId | string 
    receiver_id: mongoose.Types.ObjectId | string  
    message: string;
    createdAt: Date;
    isRead: ChatStatus
    
  }