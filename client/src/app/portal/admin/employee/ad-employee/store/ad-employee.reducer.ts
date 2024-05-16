import { Action , createReducer, on } from '@ngrx/store';
import { initialAdEmployeeState, AdEmployeeState } from './ad-employee.state';
import * as AdEmployeeActions from './ad-employee.action'


export const adEmployeeReducer = createReducer(
    initialAdEmployeeState,
    
    on(AdEmployeeActions.loadEmployeeSuccess, (state, { employees }) => ({
      ...state,
      employees: employees,
      error: null
    })),

   

    on(AdEmployeeActions.addEmployeeSuccess, (state, { employee  }) => ({
      ...state,
      categories: [
        ...state.employees,  employee
      ]
    })) ,





    on(AdEmployeeActions.updateEmployeeSuccess, (state, { employee }) => ({
      ...state,
      employees: state.employees.map(emp => emp._id === employee._id ? employee : emp)
    })),


    on(AdEmployeeActions.deleteEmployeeSuccess, (state, { employeeId }) => ({
      ...state,
      employees: state.employees.filter(employee => employee._id !== employeeId),
      error: null
    })),

    
  on(AdEmployeeActions.loadEmployeeFailure, AdEmployeeActions.addEmployeeFailure, AdEmployeeActions.updateEmployeeFailure, AdEmployeeActions.deleteEmployeeFailure, (state, { error }) => ({
    ...state,
    error
  }))



)

export function reducer(state: AdEmployeeState | undefined, action: Action) {
    return adEmployeeReducer(state, action);
  }