import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, switchMap } from 'rxjs/operators';
import { EmDashboardService } from '../em-dashboard.service';
import * as EmMessagingActions from '../store/em-dashboard.action';
import { Router } from '@angular/router';

import { Messaging } from '../../../../../model/em-messaging.model';

@Injectable()
export class EmDashboardEffects {

  loadMessage$ = createEffect(() => this.actions$.pipe(
    ofType(EmMessagingActions.loadMessage),
    mergeMap(() =>
      this.emDashboardService.getMessage().pipe(
        map((messages: Messaging[]) => EmMessagingActions.loadMessageSuccess({ messages })),
        
        catchError(error => of(EmMessagingActions.loadMessageFailure({ error: error.message })))
      )
    )
  ));


  addMessage$ = createEffect(() =>
  this.actions$.pipe(
    ofType(EmMessagingActions.addMessage),
    switchMap(({ employee_id,  message, date }) => {
      console.log('Creating user...');
      const messages: Partial<Messaging> = { employee_id , message, date }; // Use Partial<User> here
      return this.emDashboardService.addMessage(messages as Messaging).pipe( // Cast it back to User
        map(() => {
          console.log('User created successfully');
          return EmMessagingActions.loadMessage(); // Trigger a load after create
        }),
        catchError((error) => of(EmMessagingActions.loadMessageFailure({ error })))
      );
    })
  )
);

  deleteMessage$ = createEffect(() => this.actions$.pipe(
    ofType(EmMessagingActions.deleteMessage),
    mergeMap(({ messageId }) =>
      this.emDashboardService.deleteMessage(messageId).pipe(
        map(() => EmMessagingActions.deleteMessageSuccess({ messageId })),
        catchError(error => of(EmMessagingActions.deleteMessageFailure({ error: error.message })))
      )
    )
  ));

 

  constructor(  private actions$: Actions, private emDashboardService: EmDashboardService,  private router: Router ) {}

  
      }