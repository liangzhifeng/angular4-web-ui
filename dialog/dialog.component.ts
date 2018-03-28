/**
 * Dialog
 */

import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, Renderer2 } from '@angular/core';

import { maskedAsideClassName, scrollBarWidth } from '../constants';

@Component({
  selector: 'gh-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input() confirmText = '确定';
  @Input() cancelText = '取消';
  @Input() disabled = false;
  @Input() icon = '';
  @Input() showConfirm = true;
  @Input() showCancel = true;
  @Input() title = '';
  @Input() imgPreview = false;

  @Output() confirm: EventEmitter<null> = new EventEmitter();
  @Output() onClose: EventEmitter<null> = new EventEmitter();

  @HostBinding('class.opened') opened = false;

  private parent: HTMLElement;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  /**
   * close the dialog
   */
  close() {
    this.opened = false;
    this.renderer.removeClass(document.body, maskedAsideClassName);
    this.renderer.setStyle(document.body, 'border-right', '');

    setTimeout(() => {
      if (!this.parent) { return; }

      this.parent.appendChild(this.elementRef.nativeElement);
    }, 300);

    this.onClose.emit();
  }

  /**
   * confirm action
   */
  confirmDialog() {
    this.confirm.emit();
  }

  /**
   * open the dialog
   */
  open() {
    this.parent = this.elementRef.nativeElement.parentNode;
    document.body.appendChild(this.elementRef.nativeElement);

    this.opened = true;

    const overflow = document.body.clientHeight > window.innerHeight;

    this.renderer.addClass(document.body, maskedAsideClassName);

    // prevent scrolling when modal is opened
    // add a transparent border to prevent content shifting when overflow property changes
    if (overflow) {
      this.renderer.setStyle(document.body, 'border-right', `${scrollBarWidth}px solid transparent`);
    }
  }

  // click on the body mask to close the dialog
  @HostListener('document:click', ['$event'])
  onDocumentClick($event: MouseEvent) {
    if (!this.opened || $event.target !== document.body) { return; }

    this.close();
  }
}
