import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CoursesLayoutComponent } from './pages/courses-layout/courses-layout';
import { CourseListComponent } from './pages/course-list/course-list';
import { CourseDetailComponent } from './pages/course-detail/course-detail';
import { StudentProfileComponent } from './pages/student-profile/student-profile';
import { ReactiveEnrollmentFormComponent } from './pages/reactive-enrollment-form/reactive-enrollment-form';
import { NotFoundComponent } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';
import { unsavedChangesGuard } from './guards/unsaved-changes-guard';

/*
 * Hands-On 7 Task 1 & Task 2 Route Configuration:
 * - Nested routes under /courses (CoursesLayoutComponent -> child routes)
 * - Route parameters (:id)
 * - Protected routes using CanActivate (authGuard)
 * - Form protection using CanDeactivate (unsavedChangesGuard)
 * - Lazy loaded feature module/routes for /enroll
 * - Wildcard route (**) for 404 error handling (placed LAST)
 */
export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'courses',
    component: CoursesLayoutComponent,
    children: [
      { path: '', component: CourseListComponent },
      { path: ':id', component: CourseDetailComponent }
    ]
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    component: StudentProfileComponent
  },
  // Hands-On 7 Step 73: Lazy loading feature route module for /enroll
  {
    path: 'enroll',
    loadChildren: () => import('./features/enrollment/enrollment.routes').then(m => m.ENROLLMENT_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'enroll-reactive',
    component: ReactiveEnrollmentFormComponent,
    canDeactivate: [unsavedChangesGuard]
  },
  // Hands-On 7 Step 68 hint: Wildcard route MUST always be last
  { path: '**', component: NotFoundComponent }
];
