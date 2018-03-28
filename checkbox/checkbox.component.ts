import { Component, Input, OnInit } from '@angular/core';
import { AbstractValueAccessor, MakeProvider } from '../value/abstract.value.accessor';

@Component({
  selector: 'gh-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [MakeProvider(CheckboxComponent)]
})
export class CheckboxComponent extends AbstractValueAccessor {
  @Input() text: string = '';
  @Input() name: string = '';
  @Input() disabled: boolean = false;

  constructor() {
    super();
  }

  toggleCheck() {
    if (this.disabled) {
      return;
    }

    this.value = !this.value;
  }

}
