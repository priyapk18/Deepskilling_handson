import { HttpInterceptorFn } from '@angular/common/http';

// Hands-On 8 Step 88: Interceptor clones request and attaches Authorization Bearer header
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer mock-token-12345'
    }
  });
  return next(authReq);
};
