import mongoose from 'mongoose';

export interface Po {


    _id: string;
    employee_id: mongoose.Types.ObjectId | string;
    quotation_id: mongoose.Types.ObjectId | string
    po: string;
    status: 'not submitted' | 'Submitted';
    
  

}