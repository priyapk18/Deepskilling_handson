import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading';

// Hands-On 8 Step 91: Loading Interceptor using finalize operator to control global spinner
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.show();

  return next(req).pipe(
    // finalize runs on complete or error, equivalent to a try/catch/finally block
    finalize(() => loadingService.hide())
  );
};
