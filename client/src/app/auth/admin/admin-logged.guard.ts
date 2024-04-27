import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { AdminLoginService } from '../../portal/admin/adminlogin/admin-login/admin-login.service';


export const CanAdminLogged: CanActivateFn = (route, state) => {
  const authService = inject(AdminLoginService);
  const router = inject(Router);

  const token = authService.getToken();

  if (token) {
    console.log('canAdminLogged guard activated: Token exists:', token);
    return true;
  } else {
    console.log('canAdminLogged guard activated: Token does not exist');
    router.navigate(['/admin']);
    return false;
  }
};