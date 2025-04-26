import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      console.error('HTTP Error caught by interceptor:', error);

      if (error.status === 401) {
        console.log('Unauthorized! Maybe redirect to login.');
      }

      if (error.status === 500) {
        console.log('Server error occurred.');
      }

      return throwError(() => new Error(error.message));
    })
  );
};
