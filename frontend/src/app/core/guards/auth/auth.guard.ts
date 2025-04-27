import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authUrls = ['/auth/sign-in', '/auth/sign-up'];
  if(!localStorage.getItem('token')){
    if(!authUrls.includes(state.url)) router.navigate(['/auth/sign-in']);
    return true;
  }

  if(authUrls.includes(state.url)) router.navigate(['/admin']);

  return true;
};
