import mongoose from 'mongoose';

export interface Product {

    _id: string;
    category_id: mongoose.Types.ObjectId | string ; 
    product: string;
    description: string;
    uom: string;
    price: number; // Use lowercase for number
    availability: string;
    
    }