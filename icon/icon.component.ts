/**
 * Icon
 */

import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'gh-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() name: string;
  @Input() size: number;

  constructor() {
  }

  ngOnInit() {

  }

}
