import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { MealService } from '../../../services/meal/meal.service';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.page.html',
  styleUrls: ['./meal-detail.page.scss'],
})
export class MealDetailPage implements OnInit {

  @Input() meal;
  @Input() chef;
  @Input() usrId;
  subscriber;
  ingredients;
  private profilePath = "../../../assets/img/profile_pic.jpg";

  constructor(public  modal: ModalController,
              public  loadingController: LoadingController,
              public  toastController: ToastController,
              public  mealservice: MealService){ }

  ngOnInit() {
    console.log(this.chef);
    console.log(this.meal);
    this.mealservice.getMealIngredients(this.meal["mls_id"]).subscribe(ingredients =>{
      this.ingredients = ingredients; });
  }

  hideModal(){
    this.modal.dismiss()
  }

  getMeal(){
    this.subscriber = JSON.stringify({mealId:this.meal["mls_id"], usrId:this.usrId});
    console.log(this.subscriber);
    this.mealservice.subscribeToMeal(this.subscriber);
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 2000,
      spinner: "dots"
    });
    const toast = await this.toastController.create({
      position: 'top',
      duration: 2000,
      buttons: [
        {
          side: 'start',
          icon: 'restaurant',
          text: 'Have a great meal!',
          handler: () => {
            console.log('Favorite clicked');
          }
        }
      ]
    });
    await loading.present();
    await loading.onDidDismiss();
    this.modal.dismiss();
    toast.present();
  }

}
