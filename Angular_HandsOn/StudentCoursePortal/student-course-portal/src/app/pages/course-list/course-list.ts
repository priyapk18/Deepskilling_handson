import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseCardComponent } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  // Hands-On 9 Step 96: Observable stream consumed via async pipe from NgRx Store
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  // Hands-On 3 Step 25: Loading flag initialized to true
  isLoading = true;
  selectedCourseId: number | null = null;
  searchTerm = '';
  errorMessage = '';

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {
    // Hands-On 9 Step 96: Initialize store selectors
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);
  }

  ngOnInit(): void {
    // Hands-On 7 Step 71: Read query parameter from snapshot
    const searchParam = this.route.snapshot.queryParamMap.get('search');
    if (searchParam) {
      this.searchTerm = searchParam;
    }

    // Hands-On 9 Step 96: Dispatch NgRx load action
    this.store.dispatch(loadCourses());

    // Hands-On 6 & 8: Subscribe to CourseService HTTP stream
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load courses';
      },
      complete: () => {
        // Hands-On 3 Step 25: Simulated delay or completion sets isLoading to false
        setTimeout(() => {
          this.isLoading = false;
        }, 1500);
      }
    });
  }

  // Hands-On 3 Step 26: trackBy method returning course.id to optimize DOM rendering
  // Without trackBy, Angular re-renders every item in the DOM list whenever array reference changes.
  // With trackBy, Angular tracks items by unique ID and updates only modified elements.
  trackByCourseId(index: number, course: Course): number {
    return Number(course.id);
  }

  // Hands-On 2 Step 23: Output event handler method logging enrollment
  onEnroll(courseId: number): void {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
  }

  // Hands-On 7 Step 70 & 71: Route navigation with parameter and query parameter
  onSelectCourse(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  onSearchChange(): void {
    // Hands-On 7 Step 71: Update URL query parameter without full re-navigation
    this.router.navigate(['/courses'], { queryParams: { search: this.searchTerm || null } });
  }

  get filteredCourses(): Course[] {
    if (!this.searchTerm.trim()) {
      return this.courses;
    }
    const term = this.searchTerm.toLowerCase();
    return this.courses.filter(c => 
      c.name.toLowerCase().includes(term) || c.code.toLowerCase().includes(term)
    );
  }
}
