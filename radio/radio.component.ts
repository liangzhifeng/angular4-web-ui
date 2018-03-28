import { Component, Input, OnInit } from '@angular/core';
import { AbstractValueAccessor, MakeProvider } from '../value/abstract.value.accessor';

@Component({
  selector: 'gh-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [MakeProvider(RadioComponent)]
})
export class RadioComponent extends AbstractValueAccessor {
  @Input() text: string = '';

  constructor() {
    super();
  }

  toggleCheck() {
    if (!this.value) {
      this.value = !this.value;
    }
  }

}
