import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AdEmployeeService } from '../ad-employee.service';
import * as AdEmployeeActions from '../store/ad-employee.action'
import { ResetPasswordService } from '../../../../employee/reset-password/reset-password.service';

import { Employee } from '../../../../../model/ad-employee.model';



@Injectable()
export class AdEmployeeEffects {

  loadEmployee$ = createEffect(() => this.actions$.pipe(
    ofType(AdEmployeeActions.loadEmployee),
    mergeMap(() =>
      this.adEmployeeService.getEmployees().pipe(
        map((employees: Employee[]) => AdEmployeeActions.loadEmployeeSuccess({ employees })),
        
        catchError(error => of(AdEmployeeActions.loadEmployeeFailure({ error: error.message })))
      )
    )
  ));




addEmployee$ = createEffect(() =>
this.actions$.pipe(
  ofType(AdEmployeeActions.addEmployee),
  switchMap(({ formData}) => {
    console.log('Creating user...');
   
    return this.adEmployeeService.addEmployee(formData).pipe( 
      map(() => {
        console.log('User created successfully');
        return AdEmployeeActions.loadEmployee(); 
      }),
      catchError((error)  => { 

           
        let errorMessage = 'Server error'
        if(error.status === 400){
         errorMessage = 'Email Already Exist'
        }
        
        return of(AdEmployeeActions.loadEmployeeFailure({ error: errorMessage }))
  })
    );
  })
)
);


updateEmployee$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AdEmployeeActions.updateEmployee),
    switchMap(({ _id, formData }) => {
      console.log('Updating employee...');
      return this.adEmployeeService.updateEmployee(_id, formData).pipe(
        map(() => {
          console.log('Employee updated successfully');
          return AdEmployeeActions.loadEmployee(); 
        }),
        catchError((error) => of(AdEmployeeActions.updateEmployeeFailure({ error })))
      );
    })
  )
);



deleteEmployee$ = createEffect(() => this.actions$.pipe(
  ofType(AdEmployeeActions.deleteEmployee),
  mergeMap(({ employeeId }) =>
    this.adEmployeeService.deleteEmployee(employeeId).pipe(
      map(() => AdEmployeeActions.deleteEmployeeSuccess({ employeeId })),
      catchError(error => of(AdEmployeeActions.deleteEmployeeFailure({ error: error.message })))
    )
  )
));


constructor(
    private actions$: Actions,
    private adEmployeeService: AdEmployeeService,
    private resetPasswordService: ResetPasswordService
  ) {}
}







          