import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap,  concatMap } from 'rxjs/operators';
import { AdminLoginService } from '../admin-login.service';
import * as AdminActions from '../store/admin-login.action';
import { Router } from '@angular/router';
import { AppState } from '../../../../../state/app.state';
import { Store, Action } from '@ngrx/store';

@Injectable()
export class AdminLoginEffects {


  loginAdmin$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AdminActions.loginAdmin),
    concatMap(({ email, password }) =>
      this.authService.login(email, password).pipe(
        map(({ admin, token }) => {
          this.router.navigate(['/admin/portal']);
          return AdminActions.loginAdminSuccess({ admin, token });
        }),
        catchError((error) => {
         // console.error('Login error:', error);
         let errorMessage = 'Server error'
         if(error.status === 400){
          errorMessage = 'Email is Required'
         }else if(error.status === 401){
          errorMessage = 'Password Required'
         }else if(error.status === 402){
          errorMessage = 'Invalid Credential'
         }else if(error.status === 403){
          errorMessage = 'Incorrect Password'
         }
          return of(AdminActions.loginAdminFailure({ error: errorMessage}));
        })
      )
    )
  )
);



  constructor(private actions$: Actions, private authService: AdminLoginService, private router: Router,  private store: Store<AppState>) {}
}


