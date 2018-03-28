import { Component, Input, OnInit } from '@angular/core';
import { AbstractValueAccessor, MakeProvider } from '../value/abstract.value.accessor';
import { Option } from '../value/option.model';

@Component({
  selector: 'gh-radio-list',
  templateUrl: './radio-list.component.html',
  styleUrls: ['./radio-list.component.scss'],
  providers: [MakeProvider(RadioListComponent)]
})
export class RadioListComponent extends AbstractValueAccessor {
  @Input() options: Option[] = [];

  constructor() {
    super();
  }

  toggleCheck(option: Option) {
    this.value = option.value;
  }
}
