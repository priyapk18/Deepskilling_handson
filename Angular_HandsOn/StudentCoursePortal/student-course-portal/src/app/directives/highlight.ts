import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  // Hands-On 3 Step 37: Make highlight directive configurable via @Input()
  @Input() appHighlight = 'yellow';

  constructor(private el: ElementRef) {}

  // Hands-On 3 Step 33: @HostListener('mouseenter') binds to host element events automatically
  @HostListener('mouseenter') onMouseEnter(): void {
    this.highlight(this.appHighlight || 'yellow');
  }

  // Hands-On 3 Step 33: @HostListener('mouseleave') handles cleanup automatically when mouse leaves
  @HostListener('mouseleave') onMouseLeave(): void {
    this.highlight('');
  }

  private highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
