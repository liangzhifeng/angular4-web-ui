/**
 * Tooltip
 */

import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'gh-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {
  @Input() tip: string;
  @HostBinding('class') @Input() position = '';

  @HostBinding('style.left') @Input('x') x: string = '0';
  @HostBinding('style.top') @Input('y') y: string = '0';

}
