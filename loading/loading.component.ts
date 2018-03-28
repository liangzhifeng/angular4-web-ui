/**
 * Loading
 */

import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'gh-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  @Input() theme: string;

  constructor() {
  }

  ngOnInit() {
  }

}
