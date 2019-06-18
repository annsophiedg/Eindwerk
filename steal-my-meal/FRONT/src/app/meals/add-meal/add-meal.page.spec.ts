import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMealPage } from './add-meal.page';

describe('AddMealPage', () => {
  let component: AddMealPage;
  let fixture: ComponentFixture<AddMealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMealPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
