import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CourseSummaryWidgetComponent } from './course-summary-widget';

describe('CourseSummaryWidgetComponent', () => {
  let component: CourseSummaryWidgetComponent;
  let fixture: ComponentFixture<CourseSummaryWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSummaryWidgetComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseSummaryWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create course summary widget component', () => {
    expect(component).toBeTruthy();
  });
});
