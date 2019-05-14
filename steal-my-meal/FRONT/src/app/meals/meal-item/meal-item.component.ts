import { Component, OnInit, Input } from '@angular/core';
import { Meal } from '../../../models/meal';
import { Chef } from 'src/models/chef';

@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.scss'],
})



export class MealItemComponent implements OnInit {
  @Input() meal: Meal;
  @Input() chef: Chef;

  slideOpts = {
    initialSlide: 2,
    speed: 400
  };

  constructor( ) { }

  ngOnInit() {
    console.log(this.meal);
  }

  

}