import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AdUserService } from '../ad-user.service';
import * as AdUserActions from '../store/ad-user.action';

import { Admin } from '../../../../../model/ad-user.model';

@Injectable()
export class AdUserEffects {

  loadAdmin$ = createEffect(() => this.actions$.pipe(
    ofType(AdUserActions.loadAdmin),
    mergeMap(() =>
      this.adUserService.getAdmins().pipe(
        map((admins: Admin[]) => AdUserActions.loadAdminSuccess({ admins })),
        
        catchError(error => of(AdUserActions.loadAdminFailure({ error: error.message })))
      )
    )
  ));


  addAdmin$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AdUserActions.addAdmin),
    switchMap(({ fname, lname, email, password}) => {
      console.log('Creating user...');
      const admins: Partial<Admin> = { fname, lname, email, password }; // Use Partial<User> here
      return this.adUserService.addAdmin(admins as Admin).pipe( // Cast it back to User
        map(() => {
          console.log('User created successfully');
          return AdUserActions.loadAdmin(); // Trigger a load after create
        }),
        catchError((error) => of(AdUserActions.loadAdminFailure({ error })))
      );
    })
  )
);

updateAdmin$ = createEffect(() =>
this.actions$.pipe(
  ofType(AdUserActions.updateAdmin),
  switchMap(({ admin }) => {
    console.log('Updating category...');
    return this.adUserService.updateAdmin(admin).pipe(
      map((updatedAdmin: Admin) => {
        console.log('Category updated successfully');
        return AdUserActions.updateAdminSuccess({ admin: updatedAdmin });
      }),
      catchError((error) => of(AdUserActions.updateAdminFailure({ error })))
    );
  })
)
);
  
deleteAdmin$ = createEffect(() => this.actions$.pipe(
  ofType(AdUserActions.deleteAdmin),
  mergeMap(({ adminId }) =>
    this.adUserService.deleteAdmin(adminId).pipe(
      map(() => AdUserActions.deleteAdminSuccess({ adminId })),
      catchError(error => of(AdUserActions.deleteAdminFailure({ error: error.message })))
    )
  )
));

  constructor(  private actions$: Actions, private adUserService: AdUserService ) {}
}
