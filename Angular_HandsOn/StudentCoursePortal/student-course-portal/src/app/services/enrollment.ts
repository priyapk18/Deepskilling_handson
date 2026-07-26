import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CourseService } from './course';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [1, 2, 3];
  private apiUrl = 'http://localhost:3000/enrollments';

  // Hands-On 6 Step 64: Injecting CourseService into EnrollmentService demonstrates service-to-service injection
  constructor(
    private courseService: CourseService,
    private http: HttpClient
  ) {}

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourseIds(): number[] {
    return [...this.enrolledCourseIds];
  }

  getEnrolledCourses(): Course[] {
    let allCourses: Course[] = [];
    this.courseService.getCourses().subscribe(courses => allCourses = courses);
    return allCourses.filter(course => this.isEnrolled(Number(course.id)));
  }

  // Hands-On 8 Step 87: Service method for switchMap chaining to load enrolled students by course
  getStudentsByCourse(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?courseId=${courseId}`).pipe(
      catchError(() => of([
        { id: 101, name: 'John Doe', email: 'john.doe@university.edu', courseId }
      ]))
    );
  }
}
