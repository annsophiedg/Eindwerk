import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookedMealsPage } from './cooked-meals.page';

describe('CookedMealsPage', () => {
  let component: CookedMealsPage;
  let fixture: ComponentFixture<CookedMealsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookedMealsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookedMealsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
