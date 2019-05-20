import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MealService } from '../../../services/meal/meal.service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.page.html',
  styleUrls: ['./add-meal.page.scss'],
})
export class AddMealPage {

  @Input() value: number;

  //add-meal modal
  mealJson;
  today = Date.now();
  mealDate;
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

  constructor(public modal: ModalController, private formBuilder: FormBuilder, private mealService:MealService, public loadingController: LoadingController) {
    this.meal = this.formBuilder.group({
      name: ['', Validators.required, ],
      price: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }

  logForm(){
    this.mealJson = JSON.stringify(this.meal.value);
    console.log(this.mealJson);
    this.mealService.addMeal(this.mealJson);

  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Posting new meal...',
      duration: 2000,
      spinner: "dots"
    });
    await loading.present();
    await loading.onDidDismiss();
    this.modal.dismiss();
  }

  hideModal(){
    this.modal.dismiss()
  }

}