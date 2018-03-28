import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ActionButtonComponent } from './action-button.component';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ActionButtonComponent', () => {
  let component: ActionButtonComponent;
  let fixture: ComponentFixture<ActionButtonComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations:
        [ButtonComponent, IconComponent, ActionButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display text button', () => {
    component.label = 'button';
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.button-face'));

    expect(de.nativeElement.textContent).toContain('button');
  });
});
