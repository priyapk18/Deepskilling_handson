import { createReducer, on } from '@ngrx/store';
import { Course } from '../../models/course.model';
import * as CourseActions from './course.actions';

// Hands-On 9 Step 94: Define CourseState interface and pure reducer functions
export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialCourseState: CourseState = {
  courses: [
    { id: 1, name: 'Data Structures & Algorithms', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Web Development with Angular', code: 'CS202', credits: 3, gradeStatus: 'pending' },
    { id: 3, name: 'Database Management Systems', code: 'CS303', credits: 3, gradeStatus: 'passed' },
    { id: 4, name: 'Operating Systems & Networking', code: 'CS404', credits: 4, gradeStatus: 'failed' },
    { id: 5, name: 'Software Engineering Principles', code: 'CS505', credits: 2, gradeStatus: 'pending' }
  ],
  loading: false,
  error: null
};

export const courseReducer = createReducer(
  initialCourseState,
  on(CourseActions.loadCourses, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CourseActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false,
    error: null
  })),
  on(CourseActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
