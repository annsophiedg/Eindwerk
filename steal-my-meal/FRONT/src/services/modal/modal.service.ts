import { Injectable } from '@angular/core';
//modal controls & animation
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { myEnterAnimation } from '../../app/animations/enter';
import { myLeaveAnimation } from '../../app/animations/leave';
//services
import { UserService } from '../../services/user/user.service';
//pages
import { LogInPage } from '../../app/log-in/log-in.page';
import { ProfilePage } from '../../app/profile/profile.page';
import { AddMealPage } from '../../app/meals/add-meal/add-meal.page';
import { EditUserPage } from '../../app/profile/edit-user/edit-user.page';
import { AllergiesPage } from '../../app/profile/allergies/allergies.page';
import { FavoriteChefsPage } from '../../app/profile/favorite-chefs/favorite-chefs.page';
import { ExperiencePage } from '../../app/profile/experience/experience.page';
import { MealHistoryPage } from '../../app/profile/meal-history/meal-history.page';
import { OrdersPage } from '../../app/profile/orders/orders.page';
import { OrderListPage } from '../../app/profile/orders/order-list/order-list.page';
import { MealDetailPage } from '../../app/meals/meal-detail/meal-detail.page';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  constructor(
    private modal: ModalController,
    public  loadingController: LoadingController,
    public  toastController: ToastController,
    private userService:UserService
    ) { }

  public openLogIn(window){
    this.openModal(LogInPage, window);
  }

  public openProfile() {
    this.openModal(ProfilePage);
  }

  public openAddMeal() {
    this.openModal(AddMealPage);
  }

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

  public openOrders() {
    this.openModal(OrdersPage);
  }

  public OpenOrderList() {
    this.openModal(OrderListPage);
  }

  private async openModal(page,params = null) {
    const modal =  await this.modal.create({
      component: page,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps: {
        'params': params,
        'service':this
      }
    });
    return await modal.present();
  }

  async presentLoading(m,closeModal = true){
    let message = m;

    console.log(message);

    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 1000,
      spinner: "dots"
    });

    const toast = await this.toastController.create({
      position: 'top',
      duration: 2000,
      buttons: [
        {
          side: 'start',
          icon: 'restaurant',
          text: message,
          handler: () => {
            console.log('Favorite clicked');
          }
        }
      ]
    });
    await loading.present();
    await loading.onDidDismiss();
    if (closeModal == true) {
      this.hideModal();
    }
    toast.present();

    console.log('presentLoading in modal service')
  }

  public async mealDetailModal(meal, chef){
    const modal = await this.modal.create({
      component: MealDetailPage,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps: {
        'meal': meal,
        'chef': chef,
        'usrId': this.userService.getUserId(),
        'service': this
      }
    });
    return await modal.present();
  }

  public hideModal(){
    console.log('hideModal in Service!');
    this.modal.dismiss()
  }

}
