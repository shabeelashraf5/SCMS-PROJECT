import { createReducer, on } from '@ngrx/store';
import { initialAdUserState, AdUserState } from './ad-user.state';
import * as AdUserActions from '../store/ad-user.action';

export const adUserReducer = createReducer(
  initialAdUserState,
  
  on(AdUserActions.loadAdminSuccess, (state, { admins }) => ({
    ...state,
    admins: admins,
    error: null
  })),
  
  
  on(AdUserActions.addAdmin, (state, { fname, lname , email , password }) => ({
    ...state,
    categories: [
      ...state.admins,
      { _id: '', fname, lname , email , password  }
    ]
  })) ,


  on(AdUserActions.updateAdmin, (state, { admin }) => {
    const updatedAdmin = state.admins.map(adm => {
      if (adm._id === admin._id) { // Assuming _id is the unique identifier
        return { ...adm, ...admin };
      }
      return adm;
    });

    return {
      ...state,
      admins: updatedAdmin
    };
  }),

  on(AdUserActions.deleteAdminSuccess, (state, { adminId }) => ({
    ...state,
    admins: state.admins.filter(admin => admin._id !== adminId),
    error: null
  })),
  

  on(AdUserActions.loadAdminFailure, AdUserActions.addAdminFailure, AdUserActions.updateAdminFailure, AdUserActions.deleteAdminFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: AdUserState | undefined, action: any) {
  return adUserReducer(state, action);
}