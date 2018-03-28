/**
 * Context Menu
 */

import { Component, HostListener, Input, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AbstractValueAccessor, MakeProvider } from '../value/abstract.value.accessor';

import { isChildNode } from '../utils/node-element';
import { dropdownAnimation } from '../constants';

@Component({
  selector: 'gh-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  providers: [MakeProvider(ContextMenuComponent)],
  animations: [dropdownAnimation]
})
export class ContextMenuComponent extends AbstractValueAccessor {

  @Input() label: string;
  @Input() icon: string;
  @Input() position: string = '';
  @Input() gap: boolean = false;
  @Input() theme: string = 'link';
  @Input() buttonColor: string = '';
  @Input() width: string = '144px';

  @ViewChild('contextMenu') contextMenu;

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

    const targetPos: ClientRect = this.elementRef.nativeElement.getBoundingClientRect();
    const contextWidth = 100;

    const y = targetPos.bottom + 10 + 'px';
    let x = targetPos.left + 'px';
    // let x = targetPos.left + targetPos.width / 2 - contextWidth / 2 + 'px';

    switch (this.position) {
      case 'right':
        x = targetPos.left + targetPos.width - contextWidth + 'px';
        break;
      default:
        break;
    }

    this.renderer.setStyle(this.contextMenu.nativeElement, 'left', x);
    this.renderer.setStyle(this.contextMenu.nativeElement, 'top', y);

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
