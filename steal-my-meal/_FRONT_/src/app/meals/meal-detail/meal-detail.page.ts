import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
  @ViewChild('popup') popup;
  public subscriber;
  public ingredients;
  private profilePath = "../../../assets/img/profile_pic.jpg";
  public ms;
  public allergies = [];

  @Input() 
  set service(params){
    this.ms = params
  }

  constructor(
    public  loadingController: LoadingController,
    public  toastController: ToastController,
    public  mealservice: MealService
    ){ }

  ngOnInit() {
    this.mealservice.getMealIngredients(this.meal["mls_id"]).subscribe(ingredients =>{
      this.ingredients = ingredients; });
    this.mealservice.getUserAllergy(this.usrId,this.meal.mls_id).subscribe(res => {
      this.allergies = res;
    });
  }

  //send data over subscribe-url
  getMeal(){
    this.subscriber = JSON.stringify({mealId:this.meal["mls_id"], usrId:this.usrId});
    console.log(this.subscriber);
    let message = 'Have a great meal!';
    this.ms.presentLoading(message,true,this.mealservice.subscribeToMeal(this.subscriber));
  }

  show(){
    // console.log(this.popup.nativeElement.style.height);
    // if(this.popup.el.style.heigth == '0')
      this.popup.nativeElement.style.heigth = '100%';
    // else
    //   this.popup.nativeElement.style.heigth = '0';
  }
}
