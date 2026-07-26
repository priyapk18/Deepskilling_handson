import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

// Hands-On 5 Step 53: Custom synchronous validator function
export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value || '').toUpperCase();
  if (value.startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// Hands-On 5 Step 55: Custom async validator function returning a Promise after 800ms
export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (control.value && control.value.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentFormComponent implements OnInit {
  enrollForm!: FormGroup;
  submitted = false;

  // Hands-On 5 Step 49: Inject FormBuilder in constructor
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Hands-On 5 Step 49: Build reactive form model using FormBuilder
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      // Hands-On 5 Step 55: Async validator simulateEmailCheck passed as 3rd argument
      studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheck]],
      // Hands-On 5 Step 53: Sync validator noCourseCode passed in 2nd argument array
      courseId: [null, [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      // Hands-On 5 Step 52 hint: Validators.requiredTrue for checkbox validation
      agreeToTerms: [false, Validators.requiredTrue],
      // Hands-On 5 Step 56: FormArray for dynamic repeating course fields
      additionalCourses: this.fb.array([])
    });
  }

  /*
   * Hands-On 5 Step 57: Typed getter for FormArray
   * ---------------------------------------------
   * Why this getter is better than casting in the template:
   * 1. Provides strict TypeScript compile-time type-safety.
   * 2. Keeps HTML templates clean, avoiding ugly inline casting syntax like (enrollForm.get('additionalCourses') as FormArray).
   * 3. Prevents runtime errors if form control key structure changes.
   */
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  // Hands-On 5 Step 56: Method to add new course control into FormArray
  addCourseControl(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  // Hands-On 5 Step 56: Method to remove course control by index
  removeCourseControl(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  // Helper method for CanDeactivate guard
  isDirty(): boolean {
    return this.enrollForm ? this.enrollForm.dirty && !this.submitted : false;
  }

  onSubmit(): void {
    if (this.enrollForm.valid) {
      /*
       * Hands-On 5 Step 52: Difference between enrollForm.value vs enrollForm.getRawValue()
       * ----------------------------------------------------------------------------------
       * enrollForm.value:
       * Returns a JavaScript object containing values of enabled form controls only.
       * If any control in the FormGroup is disabled ([disabled]="true"), its value is omitted.
       *
       * enrollForm.getRawValue():
       * Returns a complete JavaScript object containing values of ALL form controls in the group,
       * including disabled controls.
       */
      console.log('Reactive Form Value (excludes disabled):', this.enrollForm.value);
      console.log('Reactive Form Raw Value (includes disabled):', this.enrollForm.getRawValue());
      this.submitted = true;
    }
  }
}
