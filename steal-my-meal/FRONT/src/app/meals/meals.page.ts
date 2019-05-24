import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MealService } from '../../services/meal/meal.service';
import { Meal } from '../../models/meal';
import { Chef } from '../../models/chef';
import {ChefService} from '../../services/chef/chef.service';

import { ModalController, IonSlides } from '@ionic/angular';
import { AddMealPage } from '../meals/add-meal/add-meal.page';
import { FacebookService } from 'src/services/facebook/facebook.service';
import { ActivatedRoute } from '@angular/router';
import { MealDetailPage } from './meal-detail/meal-detail.page';

declare var google;

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})

export class MealsPage implements OnInit, AfterContentInit {
  private map;
  private userID = "";
  private loggedIn:boolean = false;
  private isContentLoaded:boolean = false;
  @ViewChild('mapElement') mapElement;
  @ViewChild('slider') slider;
  @ViewChild('up') upBtn;


  meals = [];
  chefs = {};

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
              public modal: ModalController, 
              private route:ActivatedRoute) {
    //load chefs into a dictionary with their id as key
    chefService.getChefs().subscribe(chefs=>{
      chefs.forEach(chef => {
        chef = JSON.parse(chef);
        this.chefs[chef.usr_id] = chef;
      });
      //load meals after chefs, this prevent creating a meal-item before chefs in initialized.
      mealService.getMeals().subscribe(meals=>{
        this.meals = meals;
      })  
    })

    fbService.getLogin().then(val => {
      this.userID = val;
      if(val != "")
        this.loggedIn = true;
    });
    
   }

   ngAfterContentInit(): void {
    this.isContentLoaded = true;
    this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: {lat: -34.1, lng: 150.644},
          zoom: 12,
          disableDefaultUI: true
        });
  }

  ngOnInit() {
    let code = this.route.snapshot.queryParamMap.get('code');
    if(code != null){
      this.fbService.getToken(code);
    }
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

  // Modals to create

  async addMeal() {
    const modal = await this.modal.create({
      component: AddMealPage
    });
    return await modal.present();
  }

  async mealDetail(meal, chef){
    const modal = await this.modal.create({
      component: MealDetailPage,
      componentProps: {
        'meal': meal,
        'chef': chef
      }
    });
    return await modal.present();
  }
}
