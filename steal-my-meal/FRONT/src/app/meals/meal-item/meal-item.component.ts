import { Component, OnInit, Input } from '@angular/core';
import { Meal } from '../../../models/meal';

@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.scss'],
})



export class MealItemComponent implements OnInit {
  @Input() meal: Meal;

  slideOpts = {
    initialSlide: 2,
    speed: 400
  };

  constructor( ) { }

  ngOnInit() {}

  

}