import mongoose from 'mongoose';

export interface Messaging {
    _id: string;
    employee_id: mongoose.Types.ObjectId | string  
    message: string;
    date: Date;
   
  }