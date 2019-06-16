import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChefTitleComponent } from '../../chefs/chef-title/chef-title.component';
import { ChefRateComponent } from '../../chefs/chef-rate/chef-rate.component';
import { FollowComponent } from '../../chefs/follow/follow.component';
import { ChefModule } from '../../chef.module';
import { ProfilePageModule } from '../profile.module';
import { ChefCardComponent } from '../../chefs/chef-card/chef-card.component';

import { FavoriteChefsPage } from './favorite-chefs.page';
import { AppModule } from 'src/app/app.module';


const routes: Routes = [
  {
    path: '',
    component: FavoriteChefsPage
  }
];

@NgModule({
  imports: [
    AppModule
  ],
  declarations: [
    ChefCardComponent
  ],
  schemas: [
  ]
})
export class FavoriteChefsPageModule {}
