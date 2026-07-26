import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { HighlightDirective } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, HighlightDirective, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCardComponent implements OnChanges {
  // Hands-On 2 Step 20: @Input decorator to receive course data from parent
  @Input() course: Course = {
    id: 1,
    name: 'Sample Course',
    code: 'CS100',
    credits: 3,
    gradeStatus: 'pending'
  };

  // Hands-On 2 Step 21: @Output decorator with typed EventEmitter to send events up to parent
  @Output() enrollRequested = new EventEmitter<number>();

  // Hands-On 3 Step 31: Property to toggle expandable card details
  isExpanded = false;

  constructor(private enrollmentService: EnrollmentService) {}

  // Hands-On 2 Step 18: Implement ngOnChanges lifecycle hook to log input changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('Course input changed. Previous:', changes['course'].previousValue, 'Current:', changes['course'].currentValue);
    }
  }

  // Hands-On 3 Step 32: Getter for cardClasses keeping template clean and readable
  // Getters prevent template clutter by evaluating complex class conditions in TypeScript logic.
  get cardClasses(): { [key: string]: boolean } {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': this.course ? this.course.credits >= 4 : false,
      'expanded': this.isExpanded
    };
  }

  get isEnrolled(): boolean {
    return this.course ? this.enrollmentService.isEnrolled(Number(this.course.id)) : false;
  }

  // Hands-On 3 Step 30: Dynamic border color using inline style evaluation
  get borderColor(): string {
    switch (this.course?.gradeStatus) {
      case 'passed': return '#16a34a'; // Green
      case 'failed': return '#dc2626'; // Red
      default: return '#6b7280';       // Grey pending
    }
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnrollClick(): void {
    if (this.course) {
      const courseId = Number(this.course.id);
      if (this.isEnrolled) {
        this.enrollmentService.unenroll(courseId);
      } else {
        this.enrollmentService.enroll(courseId);
      }
      this.enrollRequested.emit(courseId);
    }
  }
}
