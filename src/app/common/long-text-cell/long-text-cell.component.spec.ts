import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTextCellComponent } from './long-text-cell.component';

describe('LongTextCellComponent', () => {
  let component: LongTextCellComponent;
  let fixture: ComponentFixture<LongTextCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LongTextCellComponent]
    });
    fixture = TestBed.createComponent(LongTextCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
