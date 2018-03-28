/**
 * List
 */

import {Component, Input} from '@angular/core';
import {AbstractValueAccessor, MakeProvider} from '../value/abstract.value.accessor';
import {Option} from '../value/option.model';

@Component({
  selector: 'gh-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [MakeProvider(ListComponent)]
})
export class ListComponent extends AbstractValueAccessor {

  @Input() options: Option[] = [];
  @Input() borderBoolean: boolean = false;
  @Input() itemWidth: string = '';

  select(option: Option) {
    this.value = option.value;
  }

}
