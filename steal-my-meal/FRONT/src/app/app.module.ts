import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeBe from '@angular/common/locales/be';
registerLocaleData(localeBe);

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddMealPage } from './meals/add-meal/add-meal.page';
import { MealDetailPage } from './meals/meal-detail/meal-detail.page';
import { ProfilePage } from './profile/profile.page';
import { EditUserPage } from './profile/edit-user/edit-user.page';
import { AllergiesPage } from './profile/allergies/allergies.page';
import { FavoriteChefsPage } from './profile/favorite-chefs/favorite-chefs.page';
import { ExperiencePage } from '../app/profile/experience/experience.page';
import { MealHistoryPage } from '../app/profile/meal-history/meal-history.page';
import { OrdersPage } from './profile/orders/orders.page';
import { LogInPage } from './log-in/log-in.page';

//components
// import { ChefCardComponent } from './chefs/chef-card/chef-card.component';
// import { ChefTitleComponent } from './chefs/chef-title/chef-title.component';
// import { FollowComponent } from './chefs/follow/follow.component';

@NgModule({
  //all modal components in declarations & entrycomponents
  declarations: [
    //components
    AppComponent, 
    // ChefCardComponent,
    // ChefTitleComponent,
    // FollowComponent,
    //pages
    AddMealPage,
    MealDetailPage,
    ProfilePage,
    EditUserPage,
    OrdersPage,
    AllergiesPage,
    FavoriteChefsPage,
    LogInPage,
    ExperiencePage,
    MealHistoryPage
  ],
  entryComponents: [
    AddMealPage, 
    MealDetailPage,
    ProfilePage,
    EditUserPage,
    OrdersPage,
    AllergiesPage,
    FavoriteChefsPage,
    LogInPage,
    ExperiencePage,
    MealHistoryPage
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    Ionic4DatepickerModule,
  ], 
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ]
})

export class AppModule {}
