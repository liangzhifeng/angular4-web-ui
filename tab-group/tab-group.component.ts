/**
 * Tab
 */

import { Component, AfterContentInit, ContentChildren, QueryList, Output, EventEmitter } from '@angular/core';

import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'gh-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements AfterContentInit {

  @ContentChildren(TabComponent) tabList: QueryList<TabComponent>;

  @Output() selectTab: EventEmitter<any> = new EventEmitter();

  tabs: TabComponent[] = [];

  ngAfterContentInit() {
    this.initTabs();
  }

  /**
   * find the active tab
   */
  findActiveTab(): TabComponent {
    return this.tabs.find(tab => tab.active);
  }

  /**
   * open a tab
   */
  open(tab: TabComponent) {
    this.tabs.forEach((t: TabComponent) => t.active = t === tab);

    this.selectTab.emit(tab.name);
  }

  private initTabs() {
    this.tabs = this.tabList.toArray();

    const selectedTab: TabComponent = this.findActiveTab();

    if (!selectedTab && this.tabs.length) {
      this.tabs[0].active = true;
      this.selectTab.emit(this.tabs[0].name);
    }
  }

}
