/**
 * Toggle Component
 */
import {Component, ElementRef, HostBinding, HostListener, Input, Renderer2} from '@angular/core';
import {AbstractValueAccessor, MakeProvider} from './abstract.value.accessor';


export class ToggleComponent {
  protected animateTimeMs: number = 200;
  openState = 'closed';

  constructor(
    protected elementRef: ElementRef,
    protected renderer: Renderer2
  ) { }

  close() {
    this.openState = 'closed';

    setTimeout(() => {
      this.renderer.addClass(this.elementRef.nativeElement, 'opened');
    }, this.animateTimeMs);
  }

  isOpened(): boolean {
    return this.openState === 'opened';
  }

  open() {
    this.openState = 'opened';
    this.renderer.removeClass(this.elementRef.nativeElement, 'opened');
  }

  toggle() {
    this.isOpened()
      ? this.close()
      : this.open();
  }
}
