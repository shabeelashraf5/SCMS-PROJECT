import { createReducer, on } from '@ngrx/store';
import { initialProfileState, ProfileState } from './profile.state';
import * as AdProfileActions from './profile.action'


export const emProfileReducer = createReducer(
    initialProfileState,
    

 



    
  on(  (state, { error }) => ({
    ...state,
    error
  }))



)

export function reducer(state: ProfileState | undefined, action: any) {
    return emProfileReducer(state, action);
  }