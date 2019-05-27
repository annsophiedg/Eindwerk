import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMealPage } from '../app/meals/add-meal/add-meal.page';
import { MealDetailPage } from '../app/meals/meal-detail/meal-detail.page';
import { ProfilePage } from '../app/profile/profile.page';
import { EditUserPage } from '../app/profile/edit-user/edit-user.page';
import { AllergiesPage } from '../app/profile/allergies/allergies.page';
import { FavoriteChefsPage } from '../app/profile/favorite-chefs/favorite-chefs.page';
import { ExperiencePage } from '../app/profile/experience/experience.page';
import { MealHistoryPage } from '../app/profile/meal-history/meal-history.page';
import { IonicStorageModule } from '@ionic/storage';
import { LogInPage } from './log-in/log-in.page';


@NgModule({
  //all modal components in declarations & entrycomponents
  declarations: [
    AppComponent, 
    AddMealPage,
    MealDetailPage,
    ProfilePage,
    EditUserPage,
    AllergiesPage,
    FavoriteChefsPage,
    LogInPage
  ],
  entryComponents: [
    AddMealPage, 
    MealDetailPage,
    ProfilePage,
    EditUserPage,
    AllergiesPage,
    FavoriteChefsPage,
    LogInPage
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    Ionic4DatepickerModule], 
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
