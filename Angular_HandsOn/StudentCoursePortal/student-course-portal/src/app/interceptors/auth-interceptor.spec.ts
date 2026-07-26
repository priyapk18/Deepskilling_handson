import { authInterceptor } from './auth-interceptor';
import { HttpRequest } from '@angular/common/http';

describe('authInterceptor', () => {
  it('should add Authorization bearer token header', () => {
    const req = new HttpRequest<any>('GET', '/test');
    let modifiedReq: HttpRequest<any> | undefined;
    const nextHandler: any = (r: HttpRequest<any>) => {
      modifiedReq = r;
    };

    authInterceptor(req, nextHandler);
    expect(modifiedReq?.headers.get('Authorization')).toBe('Bearer mock-token-12345');
  });
});
