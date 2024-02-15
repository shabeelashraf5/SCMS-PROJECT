import { createReducer, on } from '@ngrx/store';
import { initialAdEmployeeState, AdEmployeeState } from './ad-employee.state';
import * as AdEmployeeActions from './ad-employee.action'


export const adEmployeeReducer = createReducer(
    initialAdEmployeeState,
    
    on(AdEmployeeActions.loadEmployeeSuccess, (state, { employees }) => ({
      ...state,
      employees: employees,
      error: null
    })),

    
    on(AdEmployeeActions.addEmployee, (state, { fname, lname , email , password, position, department, area }) => ({
      ...state,
      categories: [
        ...state.employees,
        { _id: '', fname, lname , email , password, position, department, area  }
      ]
    })) ,


    on(AdEmployeeActions.updateEmployee, (state, { employee }) => {
      const updatedEmployee = state.employees.map(emp => {
        if (emp._id === employee._id) { // Assuming _id is the unique identifier
          return { ...emp, ...employee };
        }
        return emp;
      });
  
      return {
        ...state,
        employees: updatedEmployee
      };
    }),


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

export function reducer(state: AdEmployeeState | undefined, action: any) {
    return adEmployeeReducer(state, action);
  }