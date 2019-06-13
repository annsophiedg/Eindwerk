import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent} from '../map/map.component';
import { MealItemComponent } from './meal-item/meal-item.component';
import { FollowComponent } from '../chefs/follow/follow.component';
import { ChefTitleComponent } from '../chefs/chef-title/chef-title.component';

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
  declarations: [
    MapComponent,
    MealsPage, 
    MealItemComponent,
    FollowComponent,
    ChefTitleComponent
  ],
  providers:[Storage]
})
export class MealsPageModule {}
