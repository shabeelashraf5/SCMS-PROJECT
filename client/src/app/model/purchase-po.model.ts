import mongoose from 'mongoose';
import { AddQuotation } from './sales-addquo';

export interface Po {


    _id: string;
    employee_id: mongoose.Types.ObjectId | string;
    quotation_id: AddQuotation 
    po: string;
    status: 'not submitted' | 'Submitted';
    createdAt: Date

}