/**
 * Confirm service
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ConfirmOption } from './confirm-option.model';

@Injectable()
export class ConfirmService {
  private confirm: Subject<ConfirmOption> = new Subject<ConfirmOption>();

  showConfirm: Observable<ConfirmOption> = this.confirm.asObservable();

  show(options: ConfirmOption) {
    this.confirm.next(options);
  }
}
