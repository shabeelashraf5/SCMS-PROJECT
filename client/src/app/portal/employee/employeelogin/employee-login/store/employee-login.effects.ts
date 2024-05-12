import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, concatMap } from 'rxjs/operators';
import { EmployeeLoginService } from '../employee-login.service';
import * as EmployeeActions from '../store/employee-login.action'
import { Router } from '@angular/router';

@Injectable()
export class EmployeeLoginEffects {

 
    loginEmployee$ = createEffect(() =>
  this.actions$.pipe(
    ofType(EmployeeActions.loginEmployee),
    concatMap(({ email, password }) =>
      this.authService.login(email, password).pipe(
        map(({ employee, token, refreshToken }) => {
          this.router.navigate(['/portal/dashboard']);
          return EmployeeActions.loginEmployeeSuccess({ employee, token, refreshToken });
        }),
        catchError((error) => {
          //console.error('Login error:', error);
          let errorMessage = 'Server error';
            if (error.status === 400) {
              errorMessage = 'Email is required.';
            } else if (error.status === 401) {
              errorMessage = 'Incorrect Password.';
            }else if(error.status === 402) {
              errorMessage = 'Invalid Credential'
            }else if(error.status === 403) {
              errorMessage = 'Password required'
            }
          return of(EmployeeActions.loginEmployeeFailure({ error: errorMessage }));
        })
      )
    )
  )
);

    

  constructor(private actions$: Actions, private authService: EmployeeLoginService , private router: Router) {}
}
