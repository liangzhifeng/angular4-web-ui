/**
 * Tooltip directive
 */

import { ComponentFactoryResolver, Directive, HostListener, Input, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[ghTooltip]'
})
export class TooltipDirective {

  static DELTA: number = 15;

  @Input() ghTooltip: string;
  @Input() ghTooltipPosition = 'default';
  @Input() ghHideTooltip: boolean = false;

  tooltip: TooltipComponent;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }

  /**
   * Initial position
   */
  @HostListener('mouseenter', ['$event'])
  onMouseEnter($event: MouseEvent) {
    if (this.tooltip || this.ghHideTooltip ) { return; }

    const targetPos: ClientRect = (<HTMLElement>$event.target).getBoundingClientRect();

    const toolTipFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);

    this.tooltip = this.viewContainerRef.createComponent(toolTipFactory, 0).instance;

    this.tooltip.tip = this.ghTooltip;
    this.tooltip.position = this.ghTooltipPosition;

    // this.tooltip.y = targetPos.top - TooltipDirective.DELTA + 'px';

    switch (this.ghTooltipPosition) {
      case 'right':
        this.tooltip.x = targetPos.right + TooltipDirective.DELTA + 'px';
        this.tooltip.y = targetPos.top + targetPos.height / 2 + 'px';
        break;
      case 'left':
        this.tooltip.x = targetPos.left - TooltipDirective.DELTA + 'px';
        this.tooltip.y = targetPos.top + targetPos.height / 2 + 'px';
        break;
      default:
        this.tooltip.y = targetPos.top - TooltipDirective.DELTA + 'px';
        this.tooltip.x = targetPos.left + targetPos.width / 2 + 'px';
    }
  }

  /**
   * Remove tooltip
   */
  @HostListener('mouseleave')
  onMouseLeave() {
    if (!this.tooltip) { return; }

    this.viewContainerRef.remove(0);
    this.tooltip = null;
  }

}
