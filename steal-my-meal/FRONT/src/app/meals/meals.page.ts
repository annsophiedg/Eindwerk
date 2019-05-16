import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal/meal.service';
import { Meal } from '../../models/meal';
import { Chef } from '../../models/chef';
import {ChefService} from '../../services/chef/chef.service';

import { ModalController } from '@ionic/angular';
import { AddMealPage } from '../add-meal/add-meal.page';


@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})

export class MealsPage implements OnInit {
  meals = [];
  chefs = {};

  constructor(private mealService:MealService, private chefService:ChefService, public modal: ModalController) {
    //load chefs into a dictionary with their id as key
    chefService.getChefs().subscribe(chefs=>{
      chefs.forEach(chef => {
        chef = JSON.parse(chef);
        this.chefs[chef.usr_id] = chef;
      });
      //load meals after chefs, this prevent creating a meal-item before chefs in initialized.
      mealService.getMeals().subscribe(meals=>{
        this.meals = meals;
      })  
    })
   }


  ngOnInit() {}

  

  async presentModal() {
    const modal = await this.modal.create({
      component: AddMealPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

}
