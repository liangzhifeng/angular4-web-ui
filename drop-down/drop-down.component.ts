/**
 * Dropdown
 */

import {Component, ElementRef, HostBinding, HostListener, Input, Renderer2} from '@angular/core';

import {AbstractValueAccessor, MakeProvider} from '../value/abstract.value.accessor';

import {isChildNode} from '../utils/node-element';
import {dropdownAnimation} from '../constants';
import {Option} from '../value/option.model';

@Component({
  selector: 'gh-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
  providers: [MakeProvider(DropDownComponent)],
  animations: [dropdownAnimation]
})
export class DropDownComponent extends AbstractValueAccessor {

  @Input() optionList: Option[] = [];
  @Input() placeholder: string = '';
  @Input() size: string = ''; // large
  @Input() theme: string = 'normal';
  @Input() disabled: boolean = false;

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
    if (this.disabled) {
      return;
    }
    this.openState = 'opened';
    this.renderer.addClass(this.elementRef.nativeElement, 'opened');
  }

  toggle() {
    this.isOpened()
      ? this.close()
      : this.open();
  }

  select(option) {
    this.value = option.value;
    this.close();
  }

  toggleDropdown() {
    this.toggle();
  }

  getLabelText() {
    const options = this.optionList.filter(item => {
      return this.value && (item.value === this.value);
    });

    return options.length ? options[0].text : this.placeholder;
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
