import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogXComponent } from './modal.component';

describe('DialogXComponent', () => {
  let component: DialogXComponent;
  let fixture: ComponentFixture<DialogXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
