import mongoose from 'mongoose';
import { Employee } from './ad-employee.model';

export interface Messaging {
    _id: string;
    employee_id: Employee | string
    message: string;
    date: Date;
   
  }