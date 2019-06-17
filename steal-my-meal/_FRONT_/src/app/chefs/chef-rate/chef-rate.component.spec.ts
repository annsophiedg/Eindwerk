import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefRateComponent } from './chef-rate.component';

describe('ChefRateComponent', () => {
  let component: ChefRateComponent;
  let fixture: ComponentFixture<ChefRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefRateComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
