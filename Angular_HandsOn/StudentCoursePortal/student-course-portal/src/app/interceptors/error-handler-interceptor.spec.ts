import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification';
import { errorHandlerInterceptor } from './error-handler-interceptor';
import { HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';

describe('errorHandlerInterceptor', () => {
  it('should intercept HTTP requests', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: NotificationService, useValue: { showNotification: jasmine.createSpy('show') } }
      ]
    });

    const req = new HttpRequest('GET', '/test');
    const nextHandler: any = () => of({});

    TestBed.runInInjectionContext(() => {
      errorHandlerInterceptor(req, nextHandler).subscribe();
    });
  });
});
