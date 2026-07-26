import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  show(): void {
    queueMicrotask(() => {
      this.isLoadingSubject.next(true);
    });
  }

  hide(): void {
    queueMicrotask(() => {
      this.isLoadingSubject.next(false);
    });
  }
}
