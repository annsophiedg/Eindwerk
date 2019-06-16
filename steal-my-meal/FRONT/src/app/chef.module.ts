import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'
import { AppRoutingModule } from './app-routing.module';

// components
import { ChefCardComponent } from './chefs/chef-card/chef-card.component';
import { ChefTitleComponent } from './chefs/chef-title/chef-title.component';
import { FollowComponent } from './chefs/follow/follow.component';
import { ChefRateComponent } from './chefs/chef-rate/chef-rate.component';
import { MealItemComponent } from './meals/meal-item/meal-item.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


@NgModule({
  //all modal components in declarations & entrycomponents
  declarations: [
    //components
    
    ChefCardComponent,
    ChefTitleComponent,
    FollowComponent,
    ChefRateComponent,
    MealItemComponent,
    
  ],
  entryComponents: [

  ],
  imports: [
    IonicModule,
    CommonModule
  ], 
  providers: [

  ],
  bootstrap: [],
  exports: [
    ChefCardComponent,
    ChefTitleComponent,
    FollowComponent,
    ChefRateComponent,
    MealItemComponent
  ]
})

export class ChefModule {}
