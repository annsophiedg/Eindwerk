import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MealsPage } from './meals.page';

import { MapComponent} from '../map/map.component';
import { MealItemComponent } from './meal-item/meal-item.component';
import { ChefCardComponent } from '../chefs/chef-card/chef-card.component';
import { ChefTitleComponent } from '../chefs/chef-title/chef-title.component';
import { ChefRateComponent } from '../chefs/chef-rate/chef-rate.component';
import { FollowComponent } from '../chefs/follow/follow.component';

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
    ChefCardComponent,
    ChefTitleComponent,
    ChefRateComponent,
    FollowComponent
  ],
  providers:[Storage]
})
export class MealsPageModule {}
