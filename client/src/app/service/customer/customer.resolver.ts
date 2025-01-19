import { ResolveFn } from '@angular/router';

export const customerResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
