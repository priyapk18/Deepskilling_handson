import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditLabel',
  standalone: true
})
export class CreditLabelPipe implements PipeTransform {
  // Hands-On 3 Step 35: Transform credits number into human-readable string handling null/0 edge cases
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || value <= 0) {
      return 'No Credits';
    }
    if (value === 1) {
      return '1 Credit';
    }
    return `${value} Credits`;
  }
}
