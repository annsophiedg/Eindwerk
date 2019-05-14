import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal/meal.service';
import { Meal } from '../../models/meal';
import { Chef } from '../../models/chef';
import {ChefService} from '../../services/chef/chef.service';



@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})

export class MealsPage implements OnInit {
  meals:Meal[];
  chefs:Chef[];

  constructor(private mealService:MealService, private chefService:ChefService) { }

  ngOnInit() {

    this.mealService.getMeals().subscribe(meals=>{
      console.log(meals);
      this.meals = meals;
    })

    this.chefService.getChefs().subscribe(chefs=>{
      this.chefs = chefs;
      console.log(chefs);
    })
    
  }


}
