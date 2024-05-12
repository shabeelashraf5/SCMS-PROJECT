import { createAction, props } from '@ngrx/store';
import { Employee } from '../../../../../model/ad-employee.model';

export const loginEmployee = createAction('[Employee] Login', props<{ email: string; password: string }>());
export const loginEmployeeSuccess = createAction('[Employee] Login Success', props<{ employee: Employee; token: string; refreshToken: string }>());
export const loginEmployeeFailure = createAction('[Employee] Login Failure', props<{ error: string }>());

export const storeToken = createAction('[Employee] Store Token', props<{ token: string }>());

export const logoutAdmin = createAction('[Employee] Logout');