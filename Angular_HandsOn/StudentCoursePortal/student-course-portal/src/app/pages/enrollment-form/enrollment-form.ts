import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css'
})
export class EnrollmentFormComponent {
  // Model object bound via [(ngModel)] in template-driven form
  enrollment = {
    studentName: '',
    studentEmail: '',
    courseId: null,
    preferredSemester: 'Odd',
    agreeToTerms: false
  };

  submitted = false;

  // Hands-On 4 Step 40: onSubmit handler logging form value and validation state
  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Template-Driven Form Submitted successfully!');
      console.log('Form Value:', form.value);
      console.log('Form Valid State:', form.valid);
      this.submitted = true;
    }
  }

  // Hands-On 4 Step 47: Reset button calling enrollForm.resetForm()
  resetForm(form: NgForm): void {
    form.resetForm({
      preferredSemester: 'Odd',
      agreeToTerms: false
    });
    this.submitted = false;
  }
}
