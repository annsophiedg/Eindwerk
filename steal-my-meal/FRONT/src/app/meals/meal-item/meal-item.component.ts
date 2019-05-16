import { Component, OnInit, Input } from '@angular/core';
import { Meal } from '../../../models/meal';
import { Chef } from  'src/models/chef';

@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.scss'],
})



export class MealItemComponent implements OnInit {
  @Input() meal: Meal;
  @Input() chef;
  private profilePath = "../../../assets/img/profile_pic.jpg";

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor( ) {

  }

  ngOnInit() {
    
  }

  

}