import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealHistoryPage } from './meal-history.page';

describe('MealHistoryPage', () => {
  let component: MealHistoryPage;
  let fixture: ComponentFixture<MealHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealHistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
