import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css'
})
export class StudentProfileComponent implements OnInit {
  student = {
    name: 'John Doe',
    email: 'john.doe@university.edu',
    studentId: 'STU98765',
    major: 'Computer Science',
    gpa: 3.8
  };

  enrolledCourses: Course[] = [];

  constructor(
    private enrollmentService: EnrollmentService,
    private courseService: CourseService
  ) {}

  // Hands-On 6 Step 66: Subscribe to CourseService to reactively resolve enrolled course objects
  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.enrolledCourses = courses.filter(course => 
        this.enrollmentService.isEnrolled(Number(course.id))
      );
    });
  }
}
