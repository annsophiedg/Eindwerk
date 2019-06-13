import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FavoriteChefsPage } from './favorite-chefs.page';
import { ChefTitleComponent } from '../../chefs/chef-title/chef-title.component';
// import { ChefCardComponent } from '../../chefs/chef-card/chef-card.component';

const routes: Routes = [
  {
    path: '',
    component: FavoriteChefsPage
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
    FavoriteChefsPage,
    ChefTitleComponent
    // ChefCardComponent
  ]
})
export class FavoriteChefsPageModule {}
