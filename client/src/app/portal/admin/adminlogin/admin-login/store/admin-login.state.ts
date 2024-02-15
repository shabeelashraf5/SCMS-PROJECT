import { Admin } from '../../../../../model/ad-user.model';

export interface AdminLoginState {
  loggedIn: boolean;
  admin: Admin | null;
  token: string | null;
  error: string | null;
}

export const initialAdminLoginState: AdminLoginState = {
  loggedIn: false,
  admin: null,
  token: null,
  error: null,
};
