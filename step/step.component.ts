/**
 * Step
 */

import {Component, OnChanges, Input, EventEmitter, Output} from '@angular/core';
import {Step} from './step.model';

@Component({
  selector: 'gh-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnChanges {

  @Input() steps: Step[] = [];
  @Input() currentStep = 1;
  @Output() currentStepChange = new EventEmitter<number>();

  constructor() {
  }

  stepChange(i: number) {
    this.currentStep = i;
    this.currentStepChange.emit(i);
  }

  ngOnChanges() {
  }

}
