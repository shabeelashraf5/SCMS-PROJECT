import { createAction, props } from '@ngrx/store';

import { Messaging } from '../../../../../model/em-messaging.model';
import { Employee } from '../../../../../model/ad-employee.model';

export const loadMessage = createAction('[Message] Load Message');
export const loadMessageSuccess = createAction('[Message] Load Message Success', props<{ messages: Messaging[] }>());
export const loadMessageFailure = createAction('[Message] Load Message Failure', props<{ error: string }>());

export const addMessage = createAction('[Ad Message] Create Message', props<{ employee_id: string, message: string, date: Date }>());
export const addMessageSuccess = createAction('[Ad Message] Create Message Success', props<{ message: Messaging }>());
export const addMessageFailure = createAction('[Ad Message] Create Message Failure', props<{ error: string }>());


export const deleteMessage = createAction('[Message] Delete Message', props<{ messageId: string }>());
export const deleteMessageSuccess = createAction('[Message] Delete Message Success', props<{ messageId: string }>());
export const deleteMessageFailure = createAction('[Message] Delete Message Failure', props<{ error: string }>());   
