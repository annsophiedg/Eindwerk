import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ObjectUnsubscribedError } from 'rxjs';
import { formatDate, DatePipe } from "@angular/common";

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.page.html',
  styleUrls: ['./meal-detail.page.scss'],
})
export class MealDetailPage implements OnInit {

  @Input() meal;
  @Input() chef;
  public date;
  private profilePath = "../../../assets/img/profile_pic.jpg";

  constructor(public  modal: ModalController, public  loadingController: LoadingController, public  toastController: ToastController) { }

  ngOnInit() {
    var pipe = new DatePipe('be');
    this.date = this.meal.mls_date;
    this.date = pipe.transform(this.date, 'shortDate');
  }

  hideModal(){
    this.modal.dismiss()
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
