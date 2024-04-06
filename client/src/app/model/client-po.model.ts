import mongoose from 'mongoose';

export interface ClientPo {


    _id: string;
    employee_id: mongoose.Types.ObjectId | string;
    quotation_id: mongoose.Types.ObjectId | string
    clientPo: string;
    date: string;
    
  

}