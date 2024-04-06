import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EmployeeLoginService } from '../../portal/employee/employeelogin/employee-login/employee-login.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateEmLogin implements CanActivate {

  constructor(private authService: EmployeeLoginService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();

    if (token) {
      console.log('CanActivateLogin guard: Token exists');
      
      if (this.router.url !== '/employee-login') {
        console.log('Redirecting to admin portal');
        this.router.navigate(['/portal/dashboard']);
      }
      return false; 
    } else {
      console.log('CanActivateLogin guard: Token does not exist, allowing access to login page');
      return true;
    }
  }

}