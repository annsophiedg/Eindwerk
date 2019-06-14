import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ProfilePage } from './profile.page';

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
    // ChefCardComponent,
    // ChefTitleComponent,
    // ChefRateComponent,
    // FollowComponent
  ]
})
export class ProfilePagePageModule {}
