import mongoose from 'mongoose';

export interface Quotation {


    _id: string;
    employee_id: mongoose.Types.ObjectId | string;
    srfq: string;
    status: 'not submitted' | 'Submitted';
    createdAt: Date


}