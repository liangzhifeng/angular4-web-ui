/**
 * UI constants
 */

import { animate, state, style, trigger, transition } from '@angular/animations';


// dropdown animation
export const dropdownAnimation: any = trigger('openState', [
  state('closed', style({
    display: 'none',
    opacity: '0',
    transform: 'translateY(-20%)',
    zIndex: '-1'
  })),
  state('opened', style({
    display: 'block',
    opacity: '1',
    transform: 'translateY(0)'
  })),
  transition('closed <=> opened', animate('200ms linear'))
]);

export const slideAnimation: any = trigger('openState', [
  state('closed', style({
    display: 'none',
    opacity: '0',
    transform: 'translateX(100%)',
    zIndex: '-1'
  })),
  state('opened', style({
    display: 'block',
    opacity: '1',
    transform: 'translateX(0)'
  })),
  transition('closed <=> opened', animate('300ms linear'))
]);

// the class name added to body when a modal is opened
export const maskedClassName = 'modal-masked';

export const maskedAsideClassName = 'modal-masked-aside';

// calculated scroll bar width of the browser (if any)
export const scrollBarWidth = (function () {
  const div = document.createElement('div');

  div.style.height = '100px';
  div.style.width = '100px';
  div.style.overflow = 'hidden';

  document.body.appendChild(div);

  let width = div.clientWidth;

  div.style.overflow = 'scroll';
  width -= div.clientWidth;

  if (!width) {
    width = div.offsetWidth - div.clientWidth;
  }

  document.body.removeChild(div);

  return width;
}());

// message duration
export const messageDuration: number = 3500;
