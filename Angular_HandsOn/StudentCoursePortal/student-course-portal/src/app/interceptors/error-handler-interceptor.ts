import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification';

// Hands-On 8 Step 90: Global Error Handler Interceptor for status 401 & 500
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        notificationService.showNotification('Session expired. Redirecting to home...');
        router.navigate(['/']);
      } else if (error.status === 500) {
        notificationService.showNotification('Internal server error occurred on backend server.');
      }
      return throwError(() => error);
    })
  );
};
