import mongoose from 'mongoose';
import { Category } from './ad-category.model';

export interface Products {

    _id: string;
    category_id: Category | string ; 
    product: string;
    description: string;
    uom: string;
    price: number; // Use lowercase for number
    availability: string;
    
    }