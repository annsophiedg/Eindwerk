import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MealService } from '../../services/meal/meal.service';
import { Meal } from '../../models/meal';
import { Chef } from '../../models/chef';
import {ChefService} from '../../services/chef/chef.service';
import { myEnterAnimation } from '../animations/enter';
import { myLeaveAnimation } from '../animations/leave';

import { ModalController, IonSlides } from '@ionic/angular';
import { AddMealPage } from '../meals/add-meal/add-meal.page';
import { FacebookService } from 'src/services/facebook/facebook.service';
import { ActivatedRoute } from '@angular/router';
import { MealDetailPage } from './meal-detail/meal-detail.page';
import { ProfilePage } from '../profile/profile.page';
import { ModalService } from 'src/services/modal/modal.service';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})

export class MealsPage implements OnInit {
  private map;
  private userID = "";
  private loggedIn:boolean = false;
  private isContentLoaded:boolean = false;

  @ViewChild('slider') slider;
  @ViewChild('up') upBtn;


  meals = {};
  chefs = [];

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    clickable: false,
    direction: 'vertical',
    spaceBetween: -300
  };

  constructor(private mealService:MealService,
              private chefService:ChefService, 
              private fbService:FacebookService, 
              private ms:ModalService,
              public modal: ModalController, 
              private route:ActivatedRoute,
              private storage:Storage) {

   }

  ngOnInit() {
    let code = this.route.snapshot.queryParamMap.get('code');

    if(!this.userID || this.userID == ""){
      this.storage.get('id').then(val => {
        this.userID = val;
        if(!val){
          if(code != null){
            this.fbService.getToken(code).subscribe(res => {
              this.storage.set('id', res);
              this.userID = res;
          });
          }else
            this.ms.openLogIn(); 
        }

        this.chefService.getChefs(this.userID).subscribe(chefs=>{
          
          //load meals after chefs, this prevent creating a meal-item before chefs in initialized.
          this.mealService.getMeals().subscribe(meals=>{
            meals.forEach(meal =>{
              this.meals[meal.usr_id] = meal;
            });
            chefs.forEach(chef => {
              chef = JSON.parse(chef);
              this.chefs.push(chef);
            });
          })  
        });
      });
    }
    //load chefs into a dictionary with their id as key
    
  }

  showUp(e){
    if(e == 'hide' || e.target.classList.contains("swiper-container-vertical")){
      this.upBtn.el.style.display = "block";
      this.slider.el.style.zIndex = "-1";
    }
  }
  // this.upBtn.style.display = "none";
  hideUp(e){
    // console.log(e.target)
    if(e == 'hide' || e.target.classList.contains("swiper-container-vertical")){
      if(this.upBtn.el.style.display == "block"){
          this.upBtn.el.style.display = "none";
          this.slider.el.style.zIndex = "5";
      }
    }
  }

  upClicked(){
    this.hideUp('hide');
    this.slider.slideTo(2,400);
  }

  dragUp(){
    console.log('not dragging');
    this.slider.el.style.pointerEvents = 'none';
  }

  dragDown(){
    console.log('dragging');
    this.slider.el.style.pointerEvents = 'auto';
  }
  // Modals to create

  async goToAddMeal() {
    const modal = await this.modal.create({
      component: AddMealPage,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps: {
        'usrId': this.userID
      }
    });
    return await modal.present();
  }

  async goToProfile() {
    const modal = await this.modal.create({
      component: ProfilePage
    });
    return await modal.present();
  }

  async goToMealDetail(meal, chef){
    const modal = await this.modal.create({
      component: MealDetailPage,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps: {
        'meal': meal,
        'chef': chef
      }
    });
    return await modal.present();
  }
}
