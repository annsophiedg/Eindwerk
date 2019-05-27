import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MealItemComponent } from './meal-item/meal-item.component';
import { MapComponent} from '../map/map.component';


import { IonicModule } from '@ionic/angular';

import { MealsPage } from './meals.page';

const routes: Routes = [
  {
    path: '',
    component: MealsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)    
  ],
  declarations: [MealsPage, MealItemComponent,MapComponent],
  providers:[Storage]
})
export class MealsPageModule {}
