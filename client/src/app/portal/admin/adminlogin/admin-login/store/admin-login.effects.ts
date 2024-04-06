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
          console.error('Login error:', error);
          return of(AdminActions.loginAdminFailure({ error: error.message }));
        })
      )
    )
  )
);



  constructor(private actions$: Actions, private authService: AdminLoginService, private router: Router,  private store: Store<AppState>) {}
}


