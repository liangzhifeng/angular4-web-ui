/**
 * Button
 */

import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'gh-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() theme: string = 'primary-blue';
  @Input() size: string = ''; // large=36px x-large=48px
  @Input() disabled: boolean = false;
  @Input() width: string = '';
  @Input() isSubmit: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  getButtonType() {
    return this.isSubmit ? 'submit' : 'button';
  }

}
