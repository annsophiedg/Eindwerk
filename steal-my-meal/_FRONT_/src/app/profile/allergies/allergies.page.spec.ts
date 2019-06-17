import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergiesPage } from './allergies.page';

describe('AllergiesPage', () => {
  let component: AllergiesPage;
  let fixture: ComponentFixture<AllergiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllergiesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
