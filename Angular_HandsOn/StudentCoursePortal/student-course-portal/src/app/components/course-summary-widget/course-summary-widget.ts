import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidgetComponent implements OnInit {
  liveCount = 0;

  // Hands-On 6 Step 62: Injects CourseService to verify singleton behavior across components
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.liveCount = courses.length;
    });
  }

  addQuickCourse(): void {
    this.courseService.addCourse({
      id: Date.now(),
      name: 'Cloud Computing Fundamentals',
      code: 'CS606',
      credits: 3,
      gradeStatus: 'pending'
    });
    this.courseService.getCourses().subscribe(courses => {
      this.liveCount = courses.length;
    });
  }
}
