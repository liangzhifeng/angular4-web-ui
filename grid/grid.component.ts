/**
 * Grid
 */

import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataColumn } from './data-column.model';
import { SortType } from './sort-type.enum';

import 'rxjs/add/observable/range';

@Component({
  selector: 'gh-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnChanges {

  /**
   * Data columns
   * @type {Array}
   */
  @Input() columns: DataColumn[] = [];

  /**
   * Set true to add one checkbox column at the first column.
   * @type {boolean}
   */
  @Input() allowMultiSelect: boolean = false;

  /**
   * Static data source
   */
  @Input() dataSource: any;

  /**
   * Query params for dynamic data source
   */
  @Input() queryParams: any;

  /**
   * Query functions for dynamic data source
   */
  @Input() queryFunc: ((searchParam: any) => Observable<any>);

  // theme
  @Input() theme = 'default';

  // table layout
  @Input() tableLayout = 'fixed';

  @Input() minHeight: string = '420px';

  // wrap or not
  @Input() noWrap: boolean = false;

  /**
   * Do not show pager if this value is set to true
   * @type {boolean}
   */
  @Input() noPager = false;

  /**
   * Page size
   * @type {number}
   */
  @Input() pageSize: number = 10;

  /**
   * 空数据时展示用的模板
   */
  @Input() emptyTemplate: any = null;

  /**
   * Emit when row selected change
   * @type {EventEmitter<any>}
   */
  @Output() selectedChange: EventEmitter<any> = new EventEmitter();

  /**
   * Dynamic data source
   * @type {Array}
   */
  dataset: any[] = [];

  /**
   * Current page
   * @type {number}
   */
  pageIndex: number = 1;

  /**
   * Total data rows
   * @type {number}
   */
  total: number = 0;

  /**
   * Total pages
   * @type {number}
   */
  totalPage: number = 1;

  /**
   * Sort field
   * @type {string}
   */
  currentSortFieldName = '';

  /**
   * Sort type, ASC or DESC
   * @type {SortType}
   */
  currentSortType = SortType.NONE;

  /**
   * Loading flad
   * @type {boolean}
   */
  isFetching = false;

  /**
   * Server error or network problem
   * @type {boolean}
   */
  networkError = false;

  /**
   *
   * @type {Array}
   */
  pageNumList = [
    { value: 10, text: '10' },
    { value: 20, text: '20' },
    { value: 50, text: '50' }
  ];

  // if mouse over the table header
  isHeaderHover: boolean = false;

  constructor() {
  }

  ngOnChanges() {
    this.pageIndex = 1;

    // if static dataSource is available
    if (this.dataSource && this.dataSource.length) {
      this.dataset = this.dataSource;
      this.total = this.dataSource.length;
      this.totalPage = Math.ceil(this.total / this.pageSize);
    } else {
      /**
       * Using Dynamic data source
       */
      if (this.queryParams && Object.keys(this.queryParams).length > 0) {
        this.fetchData();
      }
    }
  }

  fetchList(param): Observable<any> {
    return this.queryFunc({
      ...this.queryParams,
      ...param
    });
  }

  fetchData() {
    if (this.queryFunc) {
      this.isFetching = true;
      this.networkError = false;
      const ob = this.fetchList(this.genGridParams());

      ob.subscribe(data => {
          this.isFetching = false;
          this.dataset = data.items;
          this.total = data.total_count;
          this.totalPage = Math.ceil(this.total / this.pageSize);
        },
        () => {
          this.networkError = true;
          this.isFetching = false;
          this.dataset = [];
          this.total = 0;
        });
    }
  }

  /**
   * Generate offset, limit, sort params for data grid
   */
  genGridParams() {
    return {
      offset: (this.pageIndex - 1) * this.pageSize,
      limit: this.pageSize,
      order_by_list: this.getSortList()
    };
  }

  /**
   *
   */
  getErrorMsg() {
    if (this.networkError) {
      return '网络出错，请稍后重试';
    } else {
      return '没有查到任何符合条件的数据';
    }
  }

  /**
   * How rows are selected
   */
  getSelectCount() {
    let count = 0;

    this.dataset.forEach(row => {
      if (row.selected) {
        count++;
      }
    });

    return count;
  }

  /**
   * Get selected row index
   */
  getSelectedIndex(): number[] {
    const array = [];
    this.dataset.forEach((row, index) => {
      if (row.selected) {
        array.push(index);
      }
    });

    return array;
  }

  /**
   * Get selected data rows
   */
  getSelectedRows() {
    return this.dataset.filter(row => {
      return row.selected;
    });
  }

  /**
   * Return sort query params
   * @returns {any}
   */
  getSortList() {
    if (this.currentSortFieldName !== '' && this.currentSortType !== SortType.NONE) {
      return [{
        column: this.currentSortFieldName,
        type: this.currentSortType === SortType.ASC ? 'ASC' : 'DESC'
      }];
    } else {
      return null;
    }
  }

  /**
   * Return sort method
   * @param {DataColumn} column
   * @returns {any}
   */
  getSortStatus(column: DataColumn) {
    const field = column.sortField || column.name;

    if (field === this.currentSortFieldName) {
      switch (this.currentSortType) {
        case SortType.ASC:
          return 'sort-up';
        case SortType.DESC:
          return 'sort-desc';
        default:
          return 'sort';
      }
    } else {
      return 'sort';
    }
  }

  headerOver() {
    this.isHeaderHover = true;
  }

  headerOut() {
    this.isHeaderHover = false;
  }

  isAllSelected() {
    if (this.dataset) {
      return this.dataset.every(row => {
        return row.selected;
      });
    } else {
      return false;
    }
  }

  /**
   * mouse over the row
   * @param row
   */
  rowOver(row) {
    row.hovered = true;
  }

  rowOut(row) {
    row.hovered = false;
  }

  /**
   * Set to specific page
   * @param page
   */
  setPage(page) {
    if (page >= 1 && page <= this.totalPage && page !== this.pageIndex) {
      this.pageIndex = page;
      this.fetchData();
    }
  }

  /**
   * Select row / cancel selection
   * @param row
   */
  toggleRow(row) {
    row.selected = !row.selected;

    this.selectedChange.emit(row);
  }

  /**
   * Select all
   */
  toggleSelectAll() {
    if (this.dataset) {
      if (this.isAllSelected()) {
        this.dataset.forEach(row => {
          row.selected = false;
        });
      } else {
        this.dataset.forEach(row => {
          row.selected = true;
        });
      }
    }
  }

  /**
   * Toggle sort
   * @param {DataColumn} column
   */
  toggleSort(column: DataColumn) {
    const field = column.sortField || column.name;

    if (this.currentSortFieldName === field) {
      this.currentSortType = this.currentSortType === SortType.ASC ?
        SortType.DESC : SortType.ASC;
    } else {
      this.currentSortFieldName = field;
      this.currentSortType = SortType.DESC;
    }

    this.fetchData();
  }

  /**
   * *********************************************************************
   * All methods below are invoked by page controller
   * *********************************************************************
   **/

  /**
   * Page array for page controller
   * @type {Array}
   */
  get pageRange() {
    let range = [];

    if (this.pageIndex > 6) {
      let start = this.pageIndex - 5;
      let end = this.pageIndex + 4;

      if (end > this.totalPage) {
        start -= (end - this.totalPage);
        start = Math.max(1, start);
        end = this.totalPage;
      }

      for (let i = start; i <= end; i++) {
        if (i <= this.totalPage) {
          range.push(i);
        }
      }
    } else {
      // if current page is less than 6, display 1 - 10
      range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(p => {
        return p <= this.totalPage;
      });
    }

    return range;
  }

  /**
   *
   * @returns {number}
   */
  get pageItemStart() {
    return (this.pageIndex - 1) * this.pageSize + 1;
  }

  /**
   *
   * @returns {number}
   */
  get pageItemEnd() {
    return Math.min(this.pageIndex * this.pageSize, this.total);
  }

  /**
   * Invoke when change page size
   */
  pageSizeChange(size: number) {
    if (size !== this.pageSize) {
      this.pageIndex = 1;
      this.pageSize = size;
      this.fetchData();
    }
  }

  /**
   * Set to next page
   */
  nextPage() {
    this.setPage(this.pageIndex + 1);
  }

  /**
   * Set to previous page
   */
  prevPage() {
    this.setPage(this.pageIndex - 1);
  }

}
