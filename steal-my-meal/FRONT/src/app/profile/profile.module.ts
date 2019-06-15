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

// import { ChefCardComponent } from './../chefs/chef-card/chef-card.component';
// import { ChefTitleComponent } from './../chefs/chef-title/chef-title.component';
// import { ChefRateComponent } from './../chefs/chef-rate/chef-rate.component';
// import { FollowComponent } from './../chefs/follow/follow.component';

import { ModalService } from 'src/services/modal/modal.service';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [ModalService],
  declarations: [
    ProfilePage,
    //modal pages
    // EditUserPage,
    // AllergiesPage,
    // FavoriteChefsPage,
    // ExperiencePage,
    // MealHistoryPage,
    // OrdersPage,
    // OrderListPage,
    // ChefCardComponent,
    // ChefTitleComponent,
    // ChefRateComponent,
    // FollowComponent
  ],
  entryComponents: [
    //modal pages
    // EditUserPage,
    // AllergiesPage,
    // FavoriteChefsPage,
    // ExperiencePage,
    // MealHistoryPage,
    // OrdersPage,
    // OrderListPage,
  ]
})
export class ProfilePagePageModule {}
