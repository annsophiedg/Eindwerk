import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MealsPage } from './meals.page';
//import necessary Modal Modules
// import { AddMealPage } from '../meals/add-meal/add-meal.page';
// import { MealDetailPage } from '../meals/meal-detail/meal-detail.page';
// import { ProfilePage } from '../profile/profile.page';

import { MapComponent} from '../map/map.component';
import { ChefModule } from '../chef.module';

const routes: Routes = [
  {
    path: '',
    component: MealsPage
  }
];

@NgModule({
  imports: [
    ChefModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes) ,
  ],
  declarations: [
    MapComponent,
    MealsPage
  ],
  entryComponents: [
    //modal pages
    // AddMealPage,
    // MealDetailPage,
    // ProfilePage,  
  ],
  providers:[Storage]
})
export class MealsPageModule {}
