import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { EmDashboardService } from '../../portal/employee/dashboard/em-dashboard/em-dashboard.service';
import { Messaging } from '../../model/em-messaging.model';

export const dashboardResolverResolver: ResolveFn<Messaging[]> = (route, state) => {

  const dashService = inject(EmDashboardService)

  return dashService.getMessage();
};
