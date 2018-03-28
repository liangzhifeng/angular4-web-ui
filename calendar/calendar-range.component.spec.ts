import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarRangeComponent } from './calendar-range.component';
import { CalendarComponent } from './calendar.component';
import { IconComponent } from '../icon/icon.component';

describe('CalendarRangeComponent', () => {
  let component: CalendarRangeComponent;
  let fixture: ComponentFixture<CalendarRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, BrowserAnimationsModule],
      declarations: [IconComponent, CalendarComponent, CalendarRangeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
