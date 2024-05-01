import mongoose from 'mongoose';
import { SubmitStatus } from '../enums/submit-status.enum';

export interface Quotation {


    _id: string;
    employee_id: mongoose.Types.ObjectId | string;
    srfq: string;
    status: SubmitStatus;
    createdAt: Date


}