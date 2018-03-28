/**
 * Calendar
 */

import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy,
  Input,
  Renderer2
} from '@angular/core';
import { AbstractValueAccessor, MakeProvider } from '../value/abstract.value.accessor';
import { CalendarPanelType, CalendarMonth } from './calendar.enum';
import { isChildNode } from '../utils/node-element';
import { dropdownAnimation } from '../constants';
import * as moment from 'moment';

@Component({
  selector: 'gh-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [MakeProvider(CalendarComponent)],
  animations: [dropdownAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent extends AbstractValueAccessor {

  @Input() placeholder: string = '请选择日期';
  @Input() hideIcon: boolean = false;
  @Input() showTime: boolean = false;
  @Input() position: 'left' | 'right' = 'left';
  @Input() disabled: boolean = false;

  private _year;
  private _month;
  private _day;
  private _hour;
  private _minute;

  protected animateTimeMs: number = 200;
  openState = 'closed';

  PanelType = CalendarPanelType;

  // calendar view data model
  calendar = {
    displayMonth: new Date().getMonth(),
    displayYear: new Date().getFullYear(),
    panelType: CalendarPanelType.DAY
  };

  get date() {
    if (this.value) {
      if (typeof this.value === 'number') {
        return new Date(this.value);
      } else {
        return this.value;
      }
    }

    return null;
  }

  get currentYear() {
    if (this.date) {
      this._year = this.date.getFullYear();
    } else {
      this._year = new Date().getFullYear();
    }

    return this._year;
  }

  set currentYear(value) {
    this._year = value;
  }

  get currentMonth() {
    this._month = this.date ? this.date.getMonth() : new Date().getMonth();

    return this._month;
  }

  set currentMonth(value) {
    this._month = value;
  }

  get currentDay() {
    if (!this._day) {
      this._day = this.date ? this.date.getDate() : new Date().getDate();
    }

    return this._day;
  }

  set currentDay(value) {
    this._day = value;
  }

  get currentHour() {
    if (!this._hour) {
      this._hour = this.date ? this.date.getHours() : new Date().getHours();
    }

    return this._hour;
  }

  set currentHour(value) {
    this._hour = value;
  }

  get currentMinute() {
    if (!this._minute) {
      this._minute = this.date ? this.date.getMinutes() : new Date().getMinutes();
    }

    return this._minute;
  }

  set currentMinute(value) {
    this._minute = value;
  }

  constructor(protected elementRef: ElementRef,
              protected renderer: Renderer2) {
    super();
  }

  clear() {
    this.value = null;
    this.close();
  }

  close() {
    this.openState = 'closed';
    this.calendar.panelType = CalendarPanelType.DAY;

    setTimeout(() => {
      this.renderer.removeClass(this.elementRef.nativeElement, 'opened');
    }, this.animateTimeMs);
  }

  isOpened(): boolean {
    return this.openState === 'opened';
  }

  open() {
    if (this.disabled) {
      return;
    }

    this.openState = 'opened';
    this.renderer.addClass(this.elementRef.nativeElement, 'opened');

    // set display year & month if value has been set
    if (this.date) {
      this.calendar.displayYear = this.date.getFullYear();
      this.calendar.displayMonth = this.date.getMonth();

      // 重新给小时和分钟赋值，因为它们有可能已被设置成当前的默认时间了
      this.currentHour = this.date.getHours();
      this.currentMinute = this.date.getMinutes();
    }
  }

  toggle() {
    this.isOpened()
      ? this.close()
      : this.open();
  }

  getCalendarDays() {
    const range = [];

    const firstMonthDate = new Date(this.calendar.displayYear, this.calendar.displayMonth, 1);
    let showDate = firstMonthDate.valueOf() - 1000 * 60 * 60 * 24 * firstMonthDate.getDay();

    let i = 0;
    while (i++ < 42) {
      const date = new Date(showDate);

      range.push({
        date: date,
        old_day: showDate < firstMonthDate.valueOf(),
        new_day: date.getMonth() > firstMonthDate.getMonth() || date.getFullYear() > firstMonthDate.getFullYear(),
        normal: date.getMonth() === firstMonthDate.getMonth()
      });
      showDate += 1000 * 60 * 60 * 24;
    }

    // Every seven days in one row
    return [
      range.slice(0, 7),
      range.slice(7, 14),
      range.slice(14, 21),
      range.slice(21, 28),
      range.slice(28, 35),
      range.slice(35, 42)
    ];
  }

  getCalendarMonths() {
    const range = [];

    for (let i = CalendarMonth.JANUARY; i <= CalendarMonth.DECEMBER; i++) {
      range.push({
        month: i,
        text: this.getMonthName(i).slice(0, 3)
      });
    }

    return [
      range.slice(0, 4),
      range.slice(4, 8),
      range.slice(8, 12)
    ];
  }

  getCalendarYears() {
    const minYear = Math.floor(this.calendar.displayYear / 10) * 10 - 1;

    const range = [];

    for (let y = minYear; y <= minYear + 11; y++) {
      range.push(y);
    }

    return [
      range.slice(0, 4),
      range.slice(4, 8),
      range.slice(8, 12)
    ];
  }

  /**
   * Display text on calendar face
   */
  getDateTimeString() {
    if (this.date) {
      const d = moment(this.date);

      return this.showTime ? d.format('YYYY/MM/DD HH:mm') :
        d.format('YYYY/MM/DD');
    }
  }

  getMonthName(month): string {
    const months = [
      '一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'
    ];

    if (month >= 0 && month < 12) {
      return months[month];
    } else {
      return '';
    }
  }

  getDateName(dateIndex): string {
    const date = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
      'Saturday'];

    return dateIndex >= 0 && dateIndex < 7 ? date[dateIndex] : '';
  }

  getContentTypeLabel() {
    switch (this.calendar.panelType) {
      case CalendarPanelType.DAY: {
        return this.getMonthName(this.calendar.displayMonth)
          + ' ' + this.calendar.displayYear;
      }
      case CalendarPanelType.MONTH: {
        return this.calendar.displayYear;
      }
      case CalendarPanelType.YEAR: {
        const minYear = Math.floor(this.calendar.displayYear / 10) * 10;
        const maxYear = minYear + 9;
        return minYear + ' - ' + maxYear;
      }
      default:
        return '';
    }
  }

  /**
   * Plus one hour
   */
  hourIncrease() {
    this.currentHour < 23 ? this.currentHour += 1 :
      this.currentHour = 0;
  }

  /**
   * Minus one hour
   */
  hourDecrease() {
    this.currentHour > 0 ? this.currentHour -= 1 :
      this.currentHour = 23;
  }

  hourValidate(event) {
    let value = event.target.value.replace(/[^0-9]/g, '');

    if (value > 23) {
      value = 23;
    }

    this.currentHour = +value;
    this.storeTime();
  }

  /**
   * Is current day
   * @param {Date} date
   * @returns {boolean}
   */
  isCurrentDay(date: Date): boolean {
    const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const d2 = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());

    return d1.valueOf() === d2.valueOf();
  }

  prev() {
    switch (this.calendar.panelType) {
      case CalendarPanelType.DAY : {
        this.prevMonth();
        break;
      }
      case CalendarPanelType.MONTH: {
        this.prevYear();
        break;
      }
      case CalendarPanelType.YEAR: {
        this.prevDecade();
        break;
      }
    }
  }

  prevMonth() {
    if (this.calendar.displayMonth === CalendarMonth.JANUARY) {
      this.calendar.displayMonth = CalendarMonth.DECEMBER;
      this.prevYear();
    } else {
      this.calendar.displayMonth -= 1;
    }
  }

  prevYear() {
    this.calendar.displayYear -= 1;
  }

  prevDecade() {
    this.calendar.displayYear -= 10;
  }

  next() {
    switch (this.calendar.panelType) {
      case CalendarPanelType.DAY : {
        this.nextMonth();
        break;
      }
      case CalendarPanelType.MONTH: {
        this.nextYear();
        break;
      }
      case CalendarPanelType.YEAR: {
        this.nextDecade();
        break;
      }
    }
  }

  nextMonth() {
    if (this.calendar.displayMonth === CalendarMonth.DECEMBER) {
      this.calendar.displayMonth = CalendarMonth.JANUARY;
      this.nextYear();
    } else {
      this.calendar.displayMonth++;
    }
  }

  nextYear() {
    this.calendar.displayYear++;
  }

  nextDecade() {
    this.calendar.displayYear += 10;
  }

  minuteIncrease() {
    this.currentMinute < 59 ? this.currentMinute += 1 :
      this.currentMinute = 0;
  }

  minuteDecrease() {
    this.currentMinute > 0 ? this.currentMinute -= 1 :
      this.currentMinute = 59;
  }

  minuteValidate(event) {
    let value = Number(event.target.value.replace(/[^0-9]/g, ''));

    if (value > 59) {
      value = 59;
    }

    this.currentMinute = +value;
    this.storeTime();
  }

  // set current date in day content view
  setCurrentDate($event, date: Date) {
    $event.stopPropagation();
    this.storeDate(date);

    if (!this.showTime) {
      this.close();
    }
  }

  setCurrentMonth($event, month: number) {
    $event.stopPropagation();
    this.calendar.panelType = CalendarPanelType.DAY;
    this.calendar.displayMonth = month;
  }

  setCurrentYear($event, year: number) {
    $event.stopPropagation();
    this.calendar.panelType = CalendarPanelType.MONTH;
    this.calendar.displayYear = year;
  }

  setContentType() {
    switch (this.calendar.panelType) {
      case CalendarPanelType.DAY : {
        this.calendar.panelType = CalendarPanelType.MONTH;
        break;
      }
      case CalendarPanelType.MONTH: {
        this.calendar.panelType = CalendarPanelType.YEAR;
        break;
      }
      default:
        break;
    }
  }

  setToday() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    this.calendar.panelType = CalendarPanelType.DAY;
    this.calendar.displayYear = today.getFullYear();
    this.calendar.displayMonth = today.getMonth();
    this.storeDate(today);
    this.close();
  }

  /**
   * Save hour & minute
   */
  storeTime() {
    if (this.date && this.showTime) {
      const date = this.date;
      date.setHours(this.currentHour);
      date.setMinutes(this.currentMinute);

      this.value = date.valueOf();
    }
  }

  /**
   * Save Date
   */
  storeDate(date) {
    this.value = date.valueOf();

    this.storeTime();
  }

  /**
   * Click on the document to close the dropdown
   */
  @HostListener('document:click', ['$event'])
  onClickDocument($event: MouseEvent) {
    if (isChildNode(<HTMLElement>$event.target, this.elementRef.nativeElement)) {
      return;
    }

    this.close();
  }

}
