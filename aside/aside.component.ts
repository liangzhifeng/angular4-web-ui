import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { maskedClassName, scrollBarWidth } from '../constants';

@Component({
  selector: 'gh-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {
  @Output() onClose: EventEmitter<null> = new EventEmitter();

  @HostBinding('style.left') @Input() left: string = '220px';
  @HostBinding('class.opened') opened = false;

  private parent: HTMLElement;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  /**
   * close the modal
   */
  close() {
    this.opened = false;
    this.renderer.removeClass(document.body, maskedClassName);
    this.renderer.setStyle(document.body, 'border-right', '');

    setTimeout(() => {
      if (!this.parent) { return; }

      this.parent.appendChild(this.elementRef.nativeElement);
    }, 300);

    this.onClose.emit();
  }

  /**
   * open the modal
   */
  open() {
    this.parent = this.elementRef.nativeElement.parentNode;
    document.body.appendChild(this.elementRef.nativeElement);

    this.opened = true;

    const overflow = document.body.clientHeight > window.innerHeight;

    this.renderer.addClass(document.body, maskedClassName);

    // prevent scrolling when modal is opened
    // add a transparent border to prevent content shifting when overflow property changes
    if (overflow) {
      this.renderer.setStyle(document.body, 'border-right', `${scrollBarWidth}px solid transparent`);
    }
  }
}
