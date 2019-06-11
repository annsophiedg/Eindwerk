import { Component, OnInit, Input } from '@angular/core';
import { Meal } from '../../../models/meal';
import { Chef } from  'src/models/chef';
import { testUserAgent } from '@ionic/core';

@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.scss'],
})



export class MealItemComponent implements OnInit {
  @Input() meal;
  @Input() chef;
  @Input() distance;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor( ) {

  }

  ngOnInit() {
    console.log(this.chef);
  }


  

}