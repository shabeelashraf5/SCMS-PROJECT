import mongoose from 'mongoose';
import { AddQuotation } from './sales-addquo';
import { SubmitStatus } from '../enums/submit-status.enum';

export interface Po {


    _id: string;
    employee_id: mongoose.Types.ObjectId | string;
    quotation_id: AddQuotation 
    po: string;
    status:  SubmitStatus ;
    createdAt: Date

}