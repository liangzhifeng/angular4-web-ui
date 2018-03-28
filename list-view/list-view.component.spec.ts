import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { GridComponent } from './list-view.component';
import { ButtonComponent } from '../components/button/button.component';
import { IconComponent } from '../icon/icon.component';
import { LoadingComponent } from '../loading/loading.component';
import { DropDownComponent } from '../drop-down/drop-down.component';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [IconComponent, ButtonComponent, DropDownComponent, LoadingComponent, GridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
