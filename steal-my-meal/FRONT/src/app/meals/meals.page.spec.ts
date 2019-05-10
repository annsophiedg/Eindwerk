import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsPage } from './meals.page';

describe('MealsPage', () => {
  let component: MealsPage;
  let fixture: ComponentFixture<MealsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
