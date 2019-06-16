import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MealService } from '../../../services/meal/meal.service';
import { TypeService } from '../../../services/type/type.service';
import { UserService } from '../../../services/user/user.service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ModalService } from 'src/services/modal/modal.service';

@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.page.html',
  styleUrls: ['./edit-meal.page.scss'],
})
export class EditMealPage implements OnInit {

  @Input()params;

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

 // Properties
 // for binding initialized values
 mlsName;
 mlsType;
 mlsPrice;
 mlsPortions;
 mlsDate;
 mlsStart;
 mlsEnd;
 mlsDescription;

 disabled:boolean;
 prices = [0.5,1,2,3,4,5,6,7,8,9,10];
 portions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
 usrID: string = "";
 mealID: string = "";

 types = [];
 ingredients;
 selectedIngredients;
 mealFormObj;
 meals;
 meal;
 setMeal;
 
 mealForm: FormGroup;

 constructor(public  modal: ModalController,
             private formBuilder: FormBuilder,
             private mealService:MealService,
             private typeService:TypeService,
             public  loadingController: LoadingController,
             public  toastController: ToastController,
             public  userController: UserService,
             private ms: ModalService) {

      // Get all types
      this.typeService.getTypes().subscribe(types => {
      this.types = types});

      // Get all mealIngredients
      this.mealService.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;});
  }

 ngOnInit() {
   // Initialize properties for binding
   this.mlsType = this.params["fk_typ_id"];
   this.mlsName = this.params["mls_name"];
   this.mlsPrice = this.params["mls_price"];
   this.mlsPortions = this.params["mls_amount"];
   this.mlsDate = this.params["mls_date"];
   this.mlsStart = this.params["mls_take_start"];
   this.mlsEnd = this.params["mls_take_end"];
   this.mlsDescription = this.params["mls_description"];
   // Get mealIngredients for selecting initialized ingredients
   this.mealService.getMealIngredients(this.params["mls_id"]).subscribe(ingredients => {
   this.selectedIngredients = ingredients;});
   // Get usr Id
   this.usrID = this.userController.getUserId();
   // Get meal ID
   this.mealID = this.params["mls_id"];
   // Reactive form with validation
   this.mealForm = this.formBuilder.group({
     type: ['', Validators.required],
     name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
     price: ['', Validators.required],
     date: ['', Validators.required],
     startTime: ['', Validators.required],
     endTime: ['', Validators.required],
     portions: ['', Validators.required],
     ingredients: ['', Validators.required],
     description: ['', Validators.required]
   });
 }

 logForm(){
  // Post meal to DB
   // Create meal object from form values
  this.mealFormObj = this.mealForm.value;
   // Add user ID and meal ID to object
  this.mealFormObj.usrId = this.usrID;
  this.mealFormObj.mealId = this.mealID;
  this.mealFormObj;
}
// Present loading animation
async presentLoading(){
  await this.logForm();
  this.ms.presentLoading('Your meal was changed succefully!', true, this.mealService.updateMeal(this.mealFormObj));
}

 // Hide this modal
 hideModal(){
   this.modal.dismiss();
 }
}