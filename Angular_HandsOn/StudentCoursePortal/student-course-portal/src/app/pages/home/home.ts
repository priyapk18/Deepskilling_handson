import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseSummaryWidgetComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  // Hands-On 2 Step 11: TypeScript property for interpolation
  portalName = 'Student Course Portal';

  // Hands-On 2 Step 12: Property binding for button disabled state
  isPortalActive = true;

  // Hands-On 2 Step 13: Property for event binding response
  message = '';

  // Hands-On 2 Step 14: Property for two-way ngModel binding
  searchTerm = '';

  coursesAvailable = 12;
  enrolledCount = 3;
  gpa = 3.8;

  /*
   * DIFFERENCE BETWEEN PROPERTY BINDING AND TWO-WAY BINDING:
   * --------------------------------------------------------
   * [property] (One-Way Binding: Component -> DOM):
   * Flow of data travels only from the component class to the template DOM element.
   * Modifying the DOM input manually will NOT update the underlying TypeScript variable.
   *
   * [(ngModel)] (Two-Way Binding: Component <-> DOM):
   * Shorthand combination of [ngModel]="prop" and (ngModelChange)="prop=$event".
   * Updates to the DOM input element automatically sync back to the component property,
   * and programmatic changes in TypeScript automatically update the DOM input value.
   */

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  // Hands-On 2 Step 16: Lifecycle hook ngOnInit for data initialization
  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');
    this.courseService.getCourses().subscribe(courses => {
      if (courses && courses.length > 0) {
        this.coursesAvailable = courses.length;
      }
    });
  }

  // Hands-On 2 Step 17: Lifecycle hook ngOnDestroy for cleanup logging
  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  // Hands-On 2 Step 13: Event binding handler method
  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
    setTimeout(() => {
      this.router.navigate(['/enroll']);
    }, 800);
  }
}
