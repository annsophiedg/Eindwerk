import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MealService } from '../../../services/meal/meal.service';
import { TypeService } from '../../../services/type/type.service';
import { UserService } from '../../../services/user/user.service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.page.html',
  styleUrls: ['./add-meal.page.scss'],
})
export class AddMealPage {

  //datepicker modal
  today = Date.now();
  mealDate:string = "";
  datePickerObj: any = {
    inputDate: new Date(this.today), // default new Date()
    fromDate: new Date(this.today), // default null
    showTodayButton: true, // default true
    closeOnSelect: true, // default false
    mondayFirst: true, // default false
    todayLabel: 'Today', // default 'Today'
    closeLabel: 'Close', // default 'Close'
    titleLabel: 'When do you serve your meal?', // default null
    monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    weeksList: ["S", "M", "T", "W", "T", "F", "S"],
    dateFormat: 'YYYY-MM-DD', // default DD MMM YYYY
    clearButton : true , // default true
    momentLocale: 'pt-BR', // Default 'en-US'
    yearInAscending: true, // Default false
    btnProperties: {
      expand: 'block', // Default 'block'
      fill: '', // Default 'solid'
      size: '', // Default 'default'
      disabled: '', // Default false
      strong: '', // Default false
      color: '' // Default ''
    }
  };
  // end of datepicker modal

  prices = [0.5,1,2,3,4,5,6,7,8,9,10];
  portions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  usrID: string ="";
  types = [];
  mealFormObj;
  setMeal;
  meal: FormGroup;

  constructor(public  modal: ModalController,
              private formBuilder: FormBuilder,
              private mealService:MealService,
              private typeService:TypeService,
              public  loadingController: LoadingController,
              public  toastController: ToastController,
              public  userController: UserService) {

    this.typeService.getTypes().subscribe(types => {
      this.types = types});
  }

  ngOnInit() {
    this.usrID = this.userController.getUserId();
    this.meal = this.formBuilder.group({
      type: ['', Validators.required,],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      price: ['', [Validators.required, Validators.maxLength(2), Validators.pattern("^[0-9]*$")]],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      portions: ['', [Validators.required, Validators.maxLength(2), Validators.pattern("^[0-9]*$")]],
      description: ['', Validators.required]
    });
  }

  logForm(){

    this.mealFormObj = this.meal.value;
    this.mealFormObj.usrId = this.usrID;
    this.setMeal = JSON.stringify(this.mealFormObj);
    console.log(this.setMeal);
    this.mealService.addMeal(this.mealFormObj);
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
          text: 'New meal was created succefully!',
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

  hideModal(){
    this.modal.dismiss()
  }

}