import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

// Hands-On 9 Step 95: Selectors are memoized pure functions for performance optimization
export const selectCourseState = createFeatureSelector<CourseState>('course');

export const selectAllCourses = createSelector(
  selectCourseState,
  (state: CourseState) => state ? state.courses : []
);

export const selectCoursesLoading = createSelector(
  selectCourseState,
  (state: CourseState) => state ? state.loading : false
);

export const selectCoursesError = createSelector(
  selectCourseState,
  (state: CourseState) => state ? state.error : null
);
