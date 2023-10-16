import { CanActivateFn, Router, UrlSegmentGroup, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  return new Promise((resolve, reject) => {
    auth.canActivate().then(() => {
      resolve(true);
    }).catch(() => {
      resolve(router.createUrlTree(['/admin/login']));
    });
  });
};
