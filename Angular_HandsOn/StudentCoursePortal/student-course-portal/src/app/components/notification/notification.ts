import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

/*
 * Hands-On 6 Step 67: Component-Level Provider Demonstration
 * --------------------------------------------------------
 * By registering providers: [NotificationService] inside the @Component decorator instead of providedIn: 'root',
 * Angular's Hierarchical Dependency Injector creates a brand new, isolated instance of NotificationService
 * scoped specifically to this component instance and its children, separate from root injectors.
 */
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  providers: [NotificationService], // Scoped component-level provider
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class NotificationComponent implements OnInit {
  message: string | null = null;
  instanceId = 0;

  constructor(private notificationService: NotificationService) {
    this.instanceId = this.notificationService.instanceId;
  }

  ngOnInit(): void {
    this.notificationService.getNotification().subscribe(msg => {
      this.message = msg;
    });
  }

  triggerScopedTest(): void {
    this.notificationService.showNotification(`Scoped Notification from Component Instance #${this.instanceId}`);
  }
}
