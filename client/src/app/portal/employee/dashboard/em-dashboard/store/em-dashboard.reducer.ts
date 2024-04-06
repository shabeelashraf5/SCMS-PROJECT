import { createReducer, on } from '@ngrx/store';
import { initialEmMessagingState, EmMessagingState } from './em-dashboard.state';
import * as EmMessagingActions from '../store/em-dashboard.action';


export const emDashboardReducer = createReducer(

    initialEmMessagingState,


  on(EmMessagingActions.loadMessageSuccess, (state, { messages }) => ({
    ...state,
    messages: messages,
    error: null
  })),
  
  
  on(EmMessagingActions.addMessage, (state, { employee_id , message, date  }) => ({
    ...state,
    messages: [
      ...state.messages,
      { _id: '', employee_id , message, date }
    ]
  })) ,
  

  on(EmMessagingActions.deleteMessageSuccess, (state, { messageId }) => ({
    ...state,
    messages: state.messages.filter(message => message._id !== messageId),
    error: null
  })),


  on(EmMessagingActions.loadMessageFailure, EmMessagingActions.addMessageFailure, EmMessagingActions.deleteMessageFailure,  (state, { error }) => ({
    ...state,
    error
  }))

  
);

export function reducer(state: EmMessagingState | undefined, action: any) {
  return emDashboardReducer(state, action); 
 
}