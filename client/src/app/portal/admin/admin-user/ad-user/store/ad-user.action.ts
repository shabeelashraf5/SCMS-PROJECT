import { createAction, props } from '@ngrx/store';

import { Admin } from '../../../../../model/ad-user.model'

export const loadAdmin = createAction('[Admin] Load Admin');
export const loadAdminSuccess = createAction('[Admin] Load Admin Success', props<{ admins: Admin[] }>());
export const loadAdminFailure = createAction('[Admin] Load Admin Failure', props<{ error: string }>());

export const addAdmin = createAction('[Ad Admin ] Create Admin', props<{ fname: string, lname: string, email: string, password: string }>());
export const addAdminSuccess = createAction('[Ad Admin] Create Admin Success', props<{ admin: Admin }>());
export const addAdminFailure = createAction('[Ad Admin] Create Admin Failure', props<{ error: any }>());

export const updateAdmin = createAction('[Ad Admin] Update Admin', props<{ admin: Partial<Admin> }>());
export const updateAdminSuccess = createAction('[Ad Admin] Update Admin Success', props<{ admin: Admin }>());
export const updateAdminFailure = createAction('[Ad Admin] Update Admin Failure', props<{ error: string }>() );

export const deleteAdmin = createAction('[Admin] Delete Admin', props<{ adminId: string }>());
export const deleteAdminSuccess = createAction('[Admin] Delete Admin Success', props<{ adminId: string }>());
export const deleteAdminFailure = createAction('[Admin] Delete Admin Failure', props<{ error: string }>());
