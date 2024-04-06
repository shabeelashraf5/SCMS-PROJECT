import { createReducer, on } from '@ngrx/store';
import { initialAdminLoginState } from '../store/admin-login.state';
import * as AdminActions from '../store/admin-login.action';

export const adminLoginReducer = createReducer(
  initialAdminLoginState,
  on(AdminActions.loginAdminSuccess, (state, { admin, token }) => ({
    ...state,
    loggedIn: true,
    admin,
    token,
    error: null,
  })),

  
  on(AdminActions.storeToken, (state, { token }) => {
    console.log('Current state:', state);
    console.log('New token:', token);
    return {
      ...state,
      token,
    };
  }), 

  on(AdminActions.logoutAdmin, (state) => ({
    ...state,
    loggedIn: false,
    admin: null,
    token: null,
  })),
  
  on(AdminActions.loginAdminFailure, (state, { error }) => ({
    ...state,
    loggedIn: false,
    admin: null,
    token: null,
    error,
  }))
);
