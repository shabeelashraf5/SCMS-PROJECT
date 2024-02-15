import { Employee } from "../../../../../model/ad-employee.model";

export interface AdEmployeeState {
    employees: Employee[];
    
  }
  
  export const initialAdEmployeeState: AdEmployeeState = {
    employees: [],
   
  };