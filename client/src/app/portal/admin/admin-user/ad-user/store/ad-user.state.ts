import { Admin } from "../../../../../model/ad-user.model";

export interface AdUserState {
    admins: Admin[];
    token: string | null;
    error: string | null
   
  }
  
  export const initialAdUserState: AdUserState = {
    admins: [],
    token: null,
    error: null 
   
  };