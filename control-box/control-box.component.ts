/**
 * Form Input
 */

import { Component, OnInit, Input } from '@angular/core';
import { AbstractValueAccessor, MakeProvider } from '../value/abstract.value.accessor';

@Component({
  selector: 'gh-control-box',
  templateUrl: './control-box.component.html',
  styleUrls: ['./control-box.component.scss'],
  providers: [MakeProvider(ControlBoxComponent)],
})
export class ControlBoxComponent {
  @Input() title: String = 'Title';
  @Input() invalid: Boolean = false;
  @Input() errorMsg: String = 'Error';
  @Input() showAsterisk: Boolean = false;
  @Input() errorWidth: string = '100%';

  constructor() {
  }

}
