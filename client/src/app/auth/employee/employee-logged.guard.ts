import { Injectable, EnvironmentInjector, inject  } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { EmployeeLoginService } from '../../portal/employee/employeelogin/employee-login/employee-login.service';


 
export const CanEmployeeLogged: CanActivateFn = (route, state) => {
  const authService = inject(EmployeeLoginService);
  const router = inject(Router);

  const token = authService.getToken();

  if (token) {
    console.log('canEmployeeLogged activated: Token exists:', token);
    return true;
  } else {
    console.log('canEmployeeLogged activated: Token does not exist');
    router.navigate(['/employee-login']);
    return false;
  }
};