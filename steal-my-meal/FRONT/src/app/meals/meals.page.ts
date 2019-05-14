import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal/meal.service';
import { Meal } from '../../models/meal';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage implements OnInit {
  meals:Meal[];

  constructor(private mealService:MealService) { }

  ngOnInit() {

    this.mealService.getMeals().subscribe(meals=>{
      this.meals = meals;
    })
  }


}
