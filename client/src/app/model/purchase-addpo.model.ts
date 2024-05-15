import mongoose from 'mongoose';
import { Po } from './purchase-po.model';
import { OrderStatus } from '../enums/order-status.enum';


export interface Product {
   
    product: string;
    qty: Number;
    uom: string;
    unit: Number;
    total: Number;
}

export interface AddPo {
    _id: string;
    po_id: Po 
    employee_id: mongoose.Types.ObjectId | string;
    to: string;
    attention: string;
    email: string;
    phone: string;
    supplierrfq: string;
   
    products: Product[];
    subject: string;
    basis: string;
    payment: string;
    validity: string;
    availability: string;
    totalAmount: number;
    status:  OrderStatus;
    createdAt: Date
     
   
   
}