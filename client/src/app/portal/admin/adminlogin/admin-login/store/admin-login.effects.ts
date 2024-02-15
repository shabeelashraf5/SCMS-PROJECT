import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, } from 'rxjs/operators';
import { AdminLoginService } from '../admin-login.service';
import * as AdminActions from '../store/admin-login.action';
import { Router } from '@angular/router';

@Injectable()
export class AdminLoginEffects {
    loginAdmin$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AdminActions.loginAdmin),
        mergeMap(({ email, password }) =>
          this.authService.login(email, password).pipe(
            switchMap(({ admin, token }) => {
              this.router.navigate(['/admin/portal']);
              return of(AdminActions.loginAdminSuccess({ admin, token }));
            }),
            catchError(error => of(AdminActions.loginAdminFailure({ error: error.message })))
          )
        )
      )
    );

  constructor(private actions$: Actions, private authService: AdminLoginService, private router: Router) {}
}


