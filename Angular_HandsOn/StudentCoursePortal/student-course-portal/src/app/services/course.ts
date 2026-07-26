import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  private initialCourses: Course[] = [
    { id: 1, name: 'Data Structures & Algorithms', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Web Development with Angular', code: 'CS202', credits: 3, gradeStatus: 'pending' },
    { id: 3, name: 'Database Management Systems', code: 'CS303', credits: 3, gradeStatus: 'passed' },
    { id: 4, name: 'Operating Systems & Networking', code: 'CS404', credits: 4, gradeStatus: 'failed' },
    { id: 5, name: 'Software Engineering Principles', code: 'CS505', credits: 2, gradeStatus: 'pending' }
  ];

  constructor(private http: HttpClient) {}

  // Hands-On 6 & 8: Fetch all courses with RxJS operators (retry, tap, map, catchError)
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      retry(2), // Hands-On 8 Step 86: Retry up to 2 times on network failure
      // Hands-On 8 Step 85: tap is used for side-effects (logging) without modifying stream values, keeping pure functions intact
      tap(courses => console.log('Courses loaded:', courses.length)),
      // Hands-On 8 Step 83: map operator filters out invalid courses with credits <= 0
      map(courses => courses.filter(c => c.credits > 0)),
      // Hands-On 8 Step 84: catchError handles API failure gracefully
      catchError(err => {
        console.error('API Error in CourseService:', err);
        // Fallback to local memory data if API backend (json-server) is not running
        return of(this.initialCourses);
      })
    );
  }

  getCourseById(id: number | string): Observable<Course | undefined> {
    const numericId = Number(id);
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {
        const found = this.initialCourses.find(c => Number(c.id) === numericId);
        return of(found);
      })
    );
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    const newCourse: Course = { ...course, id: Date.now() };
    return this.http.post<Course>(this.apiUrl, newCourse).pipe(
      catchError(() => {
        this.initialCourses.push(newCourse);
        return of(newCourse);
      })
    );
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(
      catchError(() => of(course))
    );
  }

  deleteCourse(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => of(undefined))
    );
  }

  addCourse(course: Course): void {
    this.initialCourses.push(course);
  }
}
