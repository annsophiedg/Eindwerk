import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ProfilePage } from './profile.page';
//import necessary modal pages
// import { EditUserPage } from '../profile/edit-user/edit-user.page';
// import { AllergiesPage } from '../profile/allergies/allergies.page';
// import { FavoriteChefsPage } from '../profile/favorite-chefs/favorite-chefs.page';
// import { ExperiencePage } from '../../app/profile/experience/experience.page';
// import { MealHistoryPage } from '../../app/profile/meal-history/meal-history.page';
// import { OrdersPage } from '../profile/orders/orders.page';
// import { OrderListPage } from '../profile/orders/order-list/order-list.page';

import { ModalService } from 'src/services/modal/modal.service';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [ModalService,],
  declarations: [
    ProfilePage,
  ]
})
export class ProfilePageModule {}
