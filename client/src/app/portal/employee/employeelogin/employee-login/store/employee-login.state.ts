import { Employee } from "../../../../../model/ad-employee.model";

export interface EmployeeLoginState {
    loggedIn: boolean;
    employee: Employee | null;
    token: string | null;
    error: string | null;
  }

  export const initialEmployeeLoginState: EmployeeLoginState  = {
    loggedIn: false,
    employee: null,
    token: null,
    error: null,
  };
  