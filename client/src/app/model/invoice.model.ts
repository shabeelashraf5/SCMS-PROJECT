import mongoose from 'mongoose';
import { AddPo } from './purchase-addpo.model';
import { OrderStatus } from '../enums/order-status.enum';
import { PayStatus } from '../enums/pay-status.enum';

export interface Invoice {

    _id: string;
    employee_id: mongoose.Types.ObjectId | string;
    purchase_id: AddPo 
    invoice: string;
    delivery: string;
    transaction: string;
    status: OrderStatus;
    payment: PayStatus
  
  

}