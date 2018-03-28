/**
 * Form Input
 */

import { Component, OnInit, Input } from '@angular/core';
import { AbstractValueAccessor, MakeProvider } from '../value/abstract.value.accessor';

@Component({
  selector: 'gh-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss'],
  providers: [MakeProvider(InputBoxComponent)],
})
export class InputBoxComponent extends AbstractValueAccessor {
  @Input() title: string = 'Title';
  @Input() name: string = '';
  @Input() inputType: string = 'text';
  @Input() placeHolder: string = 'Placeholder';
  @Input() invalid: boolean = false;
  @Input() errorMsg: string = 'Error';
  @Input() required: boolean = false;
  @Input() showAsterisk: boolean = false;
  @Input() maxLength: number = 20;

  constructor() {
    super();
  }

}
