import mongoose from 'mongoose';

export interface Product {
    product: string;
    qty: Number;
    uom: string;
    unit: Number;
    total: Number;
}

export interface AddPo {
    _id: string;
    po_id: mongoose.Types.ObjectId | string
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
    status: 'not confirmed' | 'Confirmed';
     
   
   
}