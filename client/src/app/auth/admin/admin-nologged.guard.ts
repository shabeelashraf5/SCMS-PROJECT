import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdminLoginService } from '../../portal/admin/adminlogin/admin-login/admin-login.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateLogin implements CanActivate {

  constructor(private authService: AdminLoginService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();

    if (token) {
      console.log('CanActivateLogin guard: Token exists');
     
      if (this.router.url !== '/admin') {
        console.log('Redirecting to admin portal');
        this.router.navigate(['/admin/portal']);
      }
      return false; 
    } else {
      console.log('CanActivateLogin guard: Token does not exist, allowing access to login page');
      return true;
    }
  }

}