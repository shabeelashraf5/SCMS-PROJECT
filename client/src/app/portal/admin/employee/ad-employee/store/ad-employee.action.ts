import { createAction, props } from '@ngrx/store';
import { Employee } from '../../../../../model/ad-employee.model';


export const loadEmployee = createAction('[Employee] Load Employee');
export const loadEmployeeSuccess = createAction('[Employee] Load Employee Success', props<{ employees: Employee[] }>());
export const loadEmployeeFailure = createAction('[Admin] Load Employee Failure', props<{ error: string }>());


export const addEmployee = createAction('[Ad Employee ] Create Employee', props<{ fname: string, lname: string, email: string, password: string, position: string, department: string, area: string }>());
export const addEmployeeSuccess = createAction('[Ad Employee] Create Employee Success', props<{ employee: Employee }>());
export const addEmployeeFailure = createAction('[Ad Employee] Create Employee Failure', props<{ error: any }>());  


export const updateEmployee = createAction('[Ad Employee] Update Employee', props<{ employee: Partial<Employee> }>());
export const updateEmployeeSuccess = createAction('[Ad Employee] Update Employee Success', props<{ employee: Employee }>());
export const updateEmployeeFailure = createAction('[Ad Employee] Update Employee Failure', props<{ error: string }>() );

export const deleteEmployee = createAction('[Employee] Delete Employee', props<{ employeeId: string }>());
export const deleteEmployeeSuccess = createAction('[Employee] Delete Employee Success', props<{ employeeId: string }>());
export const deleteEmployeeFailure = createAction('[Employee] Delete Employee Failure', props<{ error: string }>());

