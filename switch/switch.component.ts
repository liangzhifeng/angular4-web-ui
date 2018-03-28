import { Component, Input, OnInit } from '@angular/core';
import { AbstractValueAccessor, MakeProvider } from '../value/abstract.value.accessor';

@Component({
  selector: 'gh-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [MakeProvider(SwitchComponent)]
})
export class SwitchComponent extends AbstractValueAccessor {
  @Input() disabled: boolean = false;
  @Input() preventDefault: boolean = false;

  constructor() {
    super();
  }

  toggleSwitch() {
    if (this.disabled) {
      return;
    }

    if (this.preventDefault) {
      return;
    }

    this.value = !this.value;
  }

  toggleOn() {
    this.value = true;
  }

  toggleOff() {
    this.value = false;
  }

}
