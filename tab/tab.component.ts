/**
 * Tab
 */

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gh-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() active: boolean = false;
  @Input() name: string;
  @Input() titleName: string;

  constructor() { }

  ngOnInit() {
  }

}
