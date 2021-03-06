import { Component, OnInit, Input } from '@angular/core';
import { ChefService } from '../../../services/chef/chef.service';

@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.scss'],
})



export class MealItemComponent implements OnInit {
  @Input() meal;
  @Input() chef;
  @Input() distance;

  isFavChef:boolean = false;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor( private chefService:ChefService ) {

  }

  ngOnInit() {
  }


  

}