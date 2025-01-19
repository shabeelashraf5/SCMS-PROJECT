import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Profile } from '../../model/emp-profile.model';
import { inject } from '@angular/core';
import { ProfileService } from '../../portal/employee/profile/profile/profile.service';
import { Employee } from '../../model/ad-employee.model';

export const profileResolver: ResolveFn<Employee> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log('Resolver triggered');
  return inject(ProfileService).getProfile();
};
