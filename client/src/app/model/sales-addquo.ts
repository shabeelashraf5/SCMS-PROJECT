import mongoose from 'mongoose';
import { Quotation } from './sales-quotation.model';
import { OrderStatus } from '../enums/order-status.enum';

export interface Product {
    
    product: string;
    qty: Number;
    uom: string;
    unit: Number;
    uplift: Number;
    total: Number;
}

export interface AddQuotation {
    _id: string;
    salesRFQ_id: Quotation;
    employee_id: mongoose.Types.ObjectId | string;
    clientname: string;
    attention: string;
    email: string;
    phone: string;
    clientrfq: string;
   
    products: Product[];
    subject: string;
    basis: string;
    payment: string;
    validity: string;
    availability: string;
    discount: Number;
    totalAmount: number;
    totalprice: number;
    
    clientPo: string;
    date: string;
    spo: string;
    status: OrderStatus;
    createdAt: Date
   
}