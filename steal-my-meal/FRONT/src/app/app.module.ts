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


@NgModule({
  declarations: [
    AppComponent, 
    AddMealPage
  ],
  entryComponents: [AddMealPage],
<<<<<<< HEAD
  imports: [
    BrowserModule, 
    HttpClientModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    IonicModule.forRoot(), 
    Ionic4DatepickerModule], 
=======
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, Ionic4DatepickerModule, FormsModule, ReactiveFormsModule],
>>>>>>> d53bcfda2fb8b080ebf6f08a83a6dbf39604b53e
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
