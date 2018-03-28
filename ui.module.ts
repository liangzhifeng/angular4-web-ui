/**
 * Components module
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IconComponent } from './icon/icon.component';
import { ButtonComponent } from './button/button.component';
import { GridComponent } from './grid/grid.component';
import { ActionButtonComponent } from './action-button/action-button.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { MessageComponent } from './message/message.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { TabComponent } from './tab/tab.component';
import { ModalComponent } from './modal/modal.component';
import { DialogComponent } from './dialog/dialog.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { SearchComponent } from './search/search.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { StepComponent } from './step/step.component';
import { LoadingComponent } from './loading/loading.component';
import { CalendarRangeComponent } from './calendar/calendar-range.component';
import { ConfirmService} from './confirm/confirm.service';
import { MessageService} from './message/message.service';
import { InputFileComponent } from './input-file/input-file.component';
import { InputBoxComponent} from './input-box/input-box.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { AsideComponent } from './aside/aside.component';
import { SwitchComponent } from './switch/switch.component';
import { ListComponent } from './list/list.component';
import { ControlBoxComponent } from './control-box/control-box.component';
import { RadioComponent } from './radio/radio.component';
import { RadioListComponent } from './radio/radio-list.component';
import { ListViewComponent } from './list-view/list-view.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    IconComponent,
    ButtonComponent,
    GridComponent,
    ActionButtonComponent,
    ConfirmComponent,
    ModalComponent,
    MessageComponent,
    CalendarComponent,
    DropDownComponent,
    TabComponent,
    DialogComponent,
    TabGroupComponent,
    SearchComponent,
    TooltipComponent,
    TooltipDirective,
    StepComponent,
    LoadingComponent,
    CalendarRangeComponent,
    InputFileComponent,
    InputBoxComponent,
    CheckboxComponent,
    AsideComponent,
    SwitchComponent,
    ListComponent,
    ControlBoxComponent,
    RadioComponent,
    RadioListComponent,
    ListViewComponent,
    ContextMenuComponent
  ],
  exports: [
    IconComponent,
    ButtonComponent,
    GridComponent,
    ActionButtonComponent,
    DropDownComponent,
    CalendarComponent,
    TabComponent,
    TabGroupComponent,
    DialogComponent,
    ModalComponent,
    ConfirmComponent,
    SearchComponent,
    TooltipDirective,
    StepComponent,
    MessageComponent,
    LoadingComponent,
    CalendarRangeComponent,
    InputFileComponent,
    InputBoxComponent,
    CheckboxComponent,
    AsideComponent,
    SwitchComponent,
    ListComponent,
    ControlBoxComponent,
    RadioComponent,
    RadioListComponent,
    ListViewComponent,
    ContextMenuComponent
  ],
  entryComponents: [
    TooltipComponent
  ],
  providers: [
    ConfirmService,
    MessageService
  ]
})
export class UIModule { }
