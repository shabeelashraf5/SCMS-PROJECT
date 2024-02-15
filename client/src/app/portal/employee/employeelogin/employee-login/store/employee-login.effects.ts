import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, } from 'rxjs/operators';
import { EmployeeLoginService } from '../employee-login.service';
import * as EmployeeActions from '../store/employee-login.action'
import { Router } from '@angular/router';

@Injectable()
export class EmployeeLoginEffects {

  
    loginEmployee$ = createEffect(() =>
      this.actions$.pipe(
        ofType(EmployeeActions.loginEmployee),
        mergeMap(({ email, password }) =>
          this.authService.login(email, password).pipe(
            switchMap(({ employee, token }) => {
              this.router.navigate(['/dashboard']);
              return of(EmployeeActions.loginEmployeeSuccess({ employee, token }));
            }),
            catchError(error => of(EmployeeActions.loginEmployeeFailure({ error: error.message })))
          )
        )
      )
    );

    

  constructor(private actions$: Actions, private authService: EmployeeLoginService , private router: Router) {}
}
