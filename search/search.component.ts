import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'gh-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() placeholder: string = '';
  @Input() width: string = '';
  @Input() maxLength: number = 20;

  @Output() search: EventEmitter<any> = new EventEmitter();

  keyword: string = '';
  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    this.search.emit(this.keyword);
  }

}
