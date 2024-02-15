import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AdEmployeeService } from '../ad-employee.service';
import * as AdEmployeeActions from '../store/ad-employee.action'

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
    switchMap(({ fname, lname, email, password, area, position, department}) => {
      console.log('Creating user...');
      const employees: Partial<Employee> = { fname, lname, email, password, area, position, department }; // Use Partial<User> here
      return this.adEmployeeService.addEmployee(employees as Employee).pipe( // Cast it back to User
        map(() => {
          console.log('User created successfully');
          return AdEmployeeActions.loadEmployee(); // Trigger a load after create
        }),
        catchError((error) => of(AdEmployeeActions.loadEmployeeFailure({ error })))
      );
    })
  )
);

updateEmployee$ = createEffect(() =>
this.actions$.pipe(
  ofType(AdEmployeeActions.updateEmployee),
  switchMap(({ employee }) => {
    console.log('Updating category...');
    return this.adEmployeeService.updateEmployee(employee).pipe(
      map((updatedEmployee: Employee) => {
        console.log('Category updated successfully');
        return AdEmployeeActions.updateEmployeeSuccess({ employee: updatedEmployee });
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
    private adEmployeeService: AdEmployeeService
  ) {}
}







          