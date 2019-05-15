import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal/meal.service';
import { Meal } from '../../models/meal';
import { ModalController } from '@ionic/angular';
import { AddMealPage } from '../meals/add-meal/add-meal.page';


@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage implements OnInit {
  meals:Meal[];

  constructor(private mealService:MealService, public modal: ModalController) { }

  ngOnInit() {

    this.mealService.getMeals().subscribe(meals=>{
      this.meals = meals;
    })
  }

  async presentModal() {
    const modal = await this.modal.create({
      component: AddMealPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

}
