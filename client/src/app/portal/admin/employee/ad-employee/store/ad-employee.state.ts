import { Employee } from "../../../../../model/ad-employee.model";

export interface AdEmployeeState {
    employees: Employee[];
    error: string | null
    
  }
  
  export const initialAdEmployeeState: AdEmployeeState = {
    employees: [],
    error: null
   
  };