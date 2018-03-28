/**
 * Action Button
 */

import { Component, HostListener, Input, ElementRef, Renderer2 } from '@angular/core';
import { AbstractValueAccessor, MakeProvider } from '../value/abstract.value.accessor';

import { isChildNode } from '../utils/node-element';
import { dropdownAnimation } from '../constants';

@Component({
  selector: 'gh-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
  providers: [MakeProvider(ActionButtonComponent)],
  animations: [dropdownAnimation]
})
export class ActionButtonComponent extends AbstractValueAccessor {

  @Input() label: string;
  @Input() icon: string;
  @Input() size: string;
  @Input() iconSize: string;
  @Input() position: string = 'left';
  @Input() gap: boolean = false;
  @Input() theme: string = 'link';
  @Input() buttonColor: string = '';

  protected animateTimeMs: number = 200;
  openState = 'closed';

  constructor(protected elementRef: ElementRef,
              protected renderer: Renderer2) {
    super();
  }

  close() {
    this.openState = 'closed';

    setTimeout(() => {
      this.renderer.removeClass(this.elementRef.nativeElement, 'opened');
    }, this.animateTimeMs);
  }

  isOpened(): boolean {
    return this.openState === 'opened';
  }

  open() {
    this.openState = 'opened';
    this.renderer.addClass(this.elementRef.nativeElement, 'opened');
  }

  toggle() {
    this.isOpened()
      ? this.close()
      : this.open();
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
