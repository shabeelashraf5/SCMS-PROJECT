import { Admin } from "../../../../../model/ad-user.model";

export interface AdUserState {
    admins: Admin[];
   
  }
  
  export const initialAdUserState: AdUserState = {
    admins: [],
   
  };