import { TestBed } from '@angular/core/testing';
import { loadingInterceptor } from './loading-interceptor';
import { LoadingService } from '../services/loading';
import { HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';

describe('loadingInterceptor', () => {
  it('should toggle loading state during request lifecycle', () => {
    const loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['show', 'hide']);

    TestBed.configureTestingModule({
      providers: [
        { provide: LoadingService, useValue: loadingServiceSpy }
      ]
    });

    const req = new HttpRequest('GET', '/test');
    const nextHandler: any = () => of({});

    TestBed.runInInjectionContext(() => {
      loadingInterceptor(req, nextHandler).subscribe();
    });

    expect(loadingServiceSpy.show).toHaveBeenCalled();
    expect(loadingServiceSpy.hide).toHaveBeenCalled();
  });
});
