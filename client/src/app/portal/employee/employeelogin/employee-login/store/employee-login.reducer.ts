import { createReducer, on } from '@ngrx/store';
import { initialEmployeeLoginState } from './employee-login.state';
import * as EmployeeActions from '../store/employee-login.action'

export const employeeLoginReducer = createReducer(
    initialEmployeeLoginState,
    on(EmployeeActions.loginEmployeeSuccess, (state, { employee, token }) => ({
      ...state,
      loggedIn: true,
      employee,
      token,
      error: null,
    })),
  
    
    on(EmployeeActions.loginEmployeeFailure, (state, { error }) => ({
      ...state,
      loggedIn: false,
      employee: null,
      token: null,
      error,
    }))
  );