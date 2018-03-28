import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageComponent} from './message.component';
import {IconComponent} from '../icon/icon.component';
import {MessageService} from './message.service';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconComponent, MessageComponent],
      providers: [MessageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
