import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdminLoginService } from '../../portal/admin/adminlogin/admin-login/admin-login.service';

@Injectable({
  providedIn: 'root'
})
export class CanAdminLogged implements CanActivate {

  constructor(private authService: AdminLoginService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();

    if (token) {
      console.log('CanActivateAdmin guard activated: Token exists:', token);
      return true;
    } else {
      console.log('CanActivateAdmin guard activated: Token does not exist');
      this.router.navigate(['/admin']);
      return false;
    }
  }
  
  
}