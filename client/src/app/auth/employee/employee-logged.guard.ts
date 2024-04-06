import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EmployeeLoginService } from '../../portal/employee/employeelogin/employee-login/employee-login.service';

@Injectable({
  providedIn: 'root'
})
export class CanEmployeeLogged implements CanActivate {

  constructor(private authService: EmployeeLoginService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();

    if (token) {
      console.log('CanActivateEmployee guard activated: Token exists:', token);
      return true;
    } else {
      console.log('CanActivateEmployee guard activated: Token does not exist');
      this.router.navigate(['/employee-login']);
      return false;
    }
  }
  
  
}