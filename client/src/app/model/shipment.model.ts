import mongoose from 'mongoose';

export interface Shipment {


    _id: string;
    employee_id: mongoose.Types.ObjectId | string;
    invoice_id: mongoose.Types.ObjectId | string
    shipment: string;
    status: 'Not Delivered' | 'Delivered';
  
  

}