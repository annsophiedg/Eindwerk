import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditUserPage } from '../../app/profile/edit-user/edit-user.page';
import { AllergiesPage } from '../../app/profile/allergies/allergies.page';
import { FavoriteChefsPage } from '../../app/profile/favorite-chefs/favorite-chefs.page';
import { ExperiencePage } from '../../app/profile/experience/experience.page';
import { MealHistoryPage } from '../../app/profile/meal-history/meal-history.page';
import { LogInPage } from '../../app/log-in/log-in.page';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modal: ModalController) { }

  public openEditUser() {
    this.openModal(EditUserPage);
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

  public openInvite() {
    this.openModal(MealHistoryPage);
  }

  public openSettings() {
    this.openModal(MealHistoryPage);
  }

  public openInfo() {
    this.openModal(MealHistoryPage);
  }

  public openLogIn(){
    this.openModal(LogInPage);
  }

  private async openModal(page) {

    const modal =  await this.modal.create({
      component: page
    });
    return await modal.present();
  }

  public hideModal(){
    this.modal.dismiss()
  }

}
