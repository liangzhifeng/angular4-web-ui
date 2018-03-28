/**
 * Calendar Range Component
 */

import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {CalendarComponent} from './calendar.component';

@Component({
  selector: 'gh-calendar-range',
  templateUrl: './calendar-range.component.html',
  styleUrls: ['./calendar-range.component.scss']
})
export class CalendarRangeComponent {
  @Output() updateDateRange: EventEmitter<any> = new EventEmitter();
  @ViewChild('calendarStart') calendarStart: CalendarComponent;
  @ViewChild('calendarEnd') calendarEnd: CalendarComponent;

  @Input() startDate: any;
  @Input() endDate: any;

  startDateChange() {
    if (this.startDate && this.endDate) {
      if (this.startDate.valueOf() >= this.endDate.valueOf()) {
        // this.endDate = this.startDate;
        this.calendarEnd.storeDate(this.startDate);
      }
    }

    this.updateDateRange.emit({start: this.startDate, end: this.endDate});
  }

  endDateChange() {
    if (this.startDate && this.endDate) {
      if (this.endDate.valueOf() <= this.startDate.valueOf()) {
        // this.startDate = this.endDate;
        this.calendarStart.storeDate(this.endDate);
      }
    }

    this.updateDateRange.emit({start: this.startDate, end: this.endDate});
  }

  clear() {
    this.calendarStart.clear();
    this.calendarEnd.clear();
    // this.startDate = null;
    // this.endDate = null;
  }
}
