import { createAction, props } from '@ngrx/store';
import { Admin } from '../../../../../model/ad-user.model';

export const loginAdmin = createAction('[Admin] Login', props<{ email: string; password: string }>());
export const loginAdminSuccess = createAction('[Admin] Login Success', props<{ admin: Admin; token: string }>());
export const loginAdminFailure = createAction('[Admin] Login Failure', props<{ error: string }>());

export const storeToken = createAction('[Admin] Store Token', props<{ token: string }>());

export const logoutAdmin = createAction('[Admin] Logout');
