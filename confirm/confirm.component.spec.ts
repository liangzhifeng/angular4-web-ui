import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmComponent} from './confirm.component';
import {DialogComponent} from '../modal/modal.component';
import {IconComponent} from '../icon/icon.component';
import {ButtonComponent} from '../components/button/button.component';
import {ConfirmService} from './confirm.service';

describe('ConfirmComponent', () => {
  let component: ConfirmComponent;
  let fixture: ComponentFixture<ConfirmComponent>;
  let confirmService: ConfirmService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmService],
      declarations: [IconComponent, ButtonComponent, DialogComponent, ConfirmComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
    confirmService = fixture.debugElement.injector.get(ConfirmService);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
