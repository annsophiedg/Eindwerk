import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CookedMealsPage } from './cooked-meals.page';

const routes: Routes = [
  {
    path: '',
    component: CookedMealsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CookedMealsPage]
})
export class CookedMealsPageModule {}
