import mongoose from 'mongoose';
import { AddPo } from './purchase-addpo.model';

export interface Invoice {

    _id: string;
    employee_id: mongoose.Types.ObjectId | string;
    purchase_id: AddPo 
    invoice: string;
    delivery: string;
    transaction: string;
    status: 'not confirmed' | 'Confirmed';
    payment: 'to be Paid' | 'Paid'
  
  

}