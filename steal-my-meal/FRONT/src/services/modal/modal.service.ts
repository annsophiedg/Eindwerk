import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../../app/profile/profile.page';
import { AddMealPage } from '../../app/meals/add-meal/add-meal.page';
import { EditUserPage } from '../../app/profile/edit-user/edit-user.page';
import { AllergiesPage } from '../../app/profile/allergies/allergies.page';
import { FavoriteChefsPage } from '../../app/profile/favorite-chefs/favorite-chefs.page';
import { ExperiencePage } from '../../app/profile/experience/experience.page';
import { MealHistoryPage } from '../../app/profile/meal-history/meal-history.page';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modal: ModalController) { }

  public openProfile() {
    console.log('openModal in Service!');
    this.openModal(ProfilePage);
  }

  public openAddMeal() {
    console.log('openModal in Service!');
    this.openModal(AddMealPage);
  }

  public openEditUser() {
    console.log('openModal in Service!');
    this.openModal(EditUserPage);
  }

  public openAllergies() {
    console.log('openModal in Service!');
    this.openModal(AllergiesPage);
  }

  public openFavoriteChefs() {
    console.log('openModal in Service!');
    this.openModal(FavoriteChefsPage);
  }

  public openExperience() {
    console.log('openModal in Service!');
    this.openModal(ExperiencePage);
  }

  public openMealHistory() {
    console.log('openModal in Service!');
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

  private async openModal(page) {
    const modal =  await this.modal.create({
      component: page
    });
    return await modal.present();
  }

  public hideModal(){
    console.log('hideModal in Service!');
    this.modal.dismiss()
  }

}
