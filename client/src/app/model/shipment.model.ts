import mongoose from 'mongoose';
import { Invoice } from './invoice.model';
import { DeliveryStatus } from '../enums/delivery-status.enum';

export interface Shipment {


    _id: string;
    employee_id: mongoose.Types.ObjectId | string;
    invoice_id: Invoice 
    shipment: string;
    status: DeliveryStatus;
  
}

