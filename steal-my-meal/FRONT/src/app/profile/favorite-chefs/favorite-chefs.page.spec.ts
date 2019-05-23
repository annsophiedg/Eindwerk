import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteChefsPage } from './favorite-chefs.page';

describe('FavoriteChefsPage', () => {
  let component: FavoriteChefsPage;
  let fixture: ComponentFixture<FavoriteChefsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteChefsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteChefsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
