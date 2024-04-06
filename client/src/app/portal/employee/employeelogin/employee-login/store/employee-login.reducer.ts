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

    on(EmployeeActions.storeToken, (state, { token }) => {
      console.log('Current state:', state);
      console.log('New token:', token);
      return {
        ...state,
        token,
      };
    }), 
  
    on(EmployeeActions.logoutAdmin, (state) => ({
      ...state,
      loggedIn: false,
      admin: null,
      token: null,
    })),
  
    
    on(EmployeeActions.loginEmployeeFailure, (state, { error }) => ({
      ...state,
      loggedIn: false,
      employee: null,
      token: null,
      error,
    }))
  );