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
import { ProfilePage } from '../app/profile/profile.page';
import { AllergiesPage } from '../app/profile/allergies/allergies.page';
import { MealDetailPage } from '../app/meals/meal-detail/meal-detail.page'
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    AppComponent, 
    AddMealPage,
    MealDetailPage,
    ProfilePage
  ],
  entryComponents: [
    AddMealPage, 
    MealDetailPage,
    ProfilePage],
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
