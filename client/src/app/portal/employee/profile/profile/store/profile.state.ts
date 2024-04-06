import { Employee } from "../../../../../model/ad-employee.model";

export interface  ProfileState {
    employees: Employee[];
    
  }
  
  export const initialProfileState: ProfileState = {
    employees: [],
   
  };