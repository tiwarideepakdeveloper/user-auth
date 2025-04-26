import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  if(!localStorage.getItem('token')){
    if(state.url != '/auth/sign-in') router.navigate(['/auth/sign-in']);
    return true;
  }

  if(state.url == '/auth/sign-in') router.navigate(['/admin']);

  return true;
};
