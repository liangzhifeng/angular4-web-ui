import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DropDownComponent } from './drop-down.component';
import { IconComponent } from '../icon/icon.component';


describe('DropDownComponent', () => {
  let component: DropDownComponent;
  let fixture: ComponentFixture<DropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, BrowserAnimationsModule],
      declarations: [IconComponent, DropDownComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
