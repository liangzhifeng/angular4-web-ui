/**
 * Confirm
 */

import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { ConfirmService } from './confirm.service';
import { ConfirmOption } from './confirm-option.model';

@Component({
  selector: 'gh-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  @ViewChild('dialog') dialog: DialogComponent;

  title: string;
  content: string;
  confirmText: string;
  cancelText: string;
  confirm: Function = () => {};

  constructor(
    private confirmService: ConfirmService
  ) {
    this.confirmService.showConfirm
      .subscribe((options: ConfirmOption) => {
        this.title = options.title;
        this.content = options.content;
        this.confirmText = options.confirmText;
        this.cancelText = options.cancelText;

        this.confirm = () => {
          options.confirm();
          this.dialog.close();
        };

        this.dialog.open();
      });
  }
}
