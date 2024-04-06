import mongoose from 'mongoose';

export interface Invoice {


    _id: string;
    employee_id: mongoose.Types.ObjectId | string;
    purchase_id: mongoose.Types.ObjectId | string
    invoice: string;
    delivery: string;
    transaction: string;
    status: 'not confirmed' | 'Confirmed';
    payment: 'to be Paid' | 'Paid'
  
  

}