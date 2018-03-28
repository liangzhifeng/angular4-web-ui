import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogComponent} from './dialog.component';
import {IconComponent} from '../icon/icon.component';
import {ButtonComponent} from '../button/button.component';


describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconComponent, ButtonComponent, DialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
