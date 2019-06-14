import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../../app/profile/profile.page';
import { AddMealPage } from '../../app/meals/add-meal/add-meal.page';
import { EditUserPage } from '../../app/profile/edit-user/edit-user.page';
import { OrdersPage } from '../../app/profile/orders/orders.page';
import { OrderListPage } from '../../app/profile/orders/order-list/order-list.page';
import { AllergiesPage } from '../../app/profile/allergies/allergies.page';
import { FavoriteChefsPage } from '../../app/profile/favorite-chefs/favorite-chefs.page';
import { ExperiencePage } from '../../app/profile/experience/experience.page';
import { MealHistoryPage } from '../../app/profile/meal-history/meal-history.page';
import { LogInPage } from '../../app/log-in/log-in.page';
import { MealDetailPage } from '../../app/meals/meal-detail/meal-detail.page';
import { myEnterAnimation } from '../../app/animations/enter';
import { myLeaveAnimation } from '../../app/animations/leave';

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  constructor(private modal: ModalController) { }

  public openProfile() {
    this.openModal(ProfilePage, this);
  }

  public openAddMeal() {
    this.openModal(AddMealPage);
  }

  public openEditUser() {
    this.openModal(EditUserPage);
  }

  public openOrders() {
    this.openModal(OrdersPage);
  }

  public OpenOrderList() {
    this.openModal(OrderListPage);
  }

  public openAllergies() {
    this.openModal(AllergiesPage);
  }

  public openFavoriteChefs() {
    this.openModal(FavoriteChefsPage);
  }

  public openExperience() {
    this.openModal(ExperiencePage);
  }

  public openMealHistory() {
    this.openModal(MealHistoryPage);
  }

  // public openInvite() {
  //   this.openModal(MealHistoryPage);
  // }

  // public openSettings() {
  //   this.openModal(MealHistoryPage);
  // }

  // public openInfo() {
  //   this.openModal(MealHistoryPage);
  // }

  public openLogIn(window){
    this.openModal(LogInPage, window);
  }

  private async openModal(page,params = null) {

    const modal =  await this.modal.create({
      component: page,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps: {
        'params': params
      }
    });
    return await modal.present();
  }

  private async mealDetail(meal, chef){
    const modal = await this.modal.create({
      component: MealDetailPage,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps: {
        'meal': meal,
        'chef': chef
      }
    });
    return await modal.present();
  }

  public hideModal(){
    console.log('hideModal in Service!');
    this.modal.dismiss()
  }

}
