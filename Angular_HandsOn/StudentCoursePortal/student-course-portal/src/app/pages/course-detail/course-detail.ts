import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CreditLabelPipe],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  courseId = '';

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  // Hands-On 7 Step 69: Read route parameter using ActivatedRoute snapshot paramMap
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseId = id;
      this.courseService.getCourseById(id).subscribe(course => {
        this.course = course;
      });
    }
  }
}
