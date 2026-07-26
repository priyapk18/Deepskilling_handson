import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification$ = new BehaviorSubject<string | null>(null);
  public instanceId = Math.floor(Math.random() * 10000);

  getNotification(): Observable<string | null> {
    return this.notification$.asObservable();
  }

  showNotification(message: string): void {
    this.notification$.next(message);
    setTimeout(() => this.clearNotification(), 4000);
  }

  clearNotification(): void {
    this.notification$.next(null);
  }
}
