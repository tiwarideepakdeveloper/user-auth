import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userReducer } from './core/store/user/user.reducer';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from './core/interceptors/http-error/http-error.interceptor';
import { permissionsReducer } from './core/store/permissions/permissions.reducer';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';

import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ 
      user: userReducer, 
      permissions: permissionsReducer 
    }),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(
      withInterceptors([
        httpErrorInterceptor,
        authInterceptor
      ])
    ),

    /**Toaster Config*/
    provideAnimations(),
    provideToastr()
  ]
};
