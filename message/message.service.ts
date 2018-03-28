/**
 * Confirm service
 */

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MessageService {
  private errorSubject: Subject<string> = new Subject<string>();
  private successSubject: Subject<string> = new Subject<string>();

  errorObservable: Observable<string> = this.errorSubject.asObservable();
  successObservable: Observable<string> = this.successSubject.asObservable();

  // show error message
  showError(message: string) {
    this.errorSubject.next(message);
  }

  // show success message
  showSuccess(message: string) {
    this.successSubject.next(message);
  }
}
