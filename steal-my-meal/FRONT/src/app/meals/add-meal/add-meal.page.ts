import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MealService } from '../../../services/meal/meal.service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.page.html',
  styleUrls: ['./add-meal.page.scss'],
})
export class AddMealPage {

  @Input() usrId;

  //add-meal modal
  mealJson;
  order;
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

  meal: FormGroup;

  startTime;

  constructor(public  modal: ModalController,
              private formBuilder: FormBuilder,
              private mealService:MealService,
              public  loadingController: LoadingController,
              public  toastController: ToastController) {

    this.meal = this.formBuilder.group({
      name: ['', Validators.required,],
      price: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      portions: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log(this.usrId);
  }

  logForm(){
    console.log(this.meal.value.usrId = this.usrId);
    this.mealJson = JSON.stringify(this.meal.value);
    console.log(this.mealJson);
    this.mealService.addMeal(this.mealJson);
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