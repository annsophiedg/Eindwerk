import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MealService } from '../../services/meal/meal.service';
import {ChefService} from '../../services/chef/chef.service';
import { myEnterAnimation } from '../animations/enter';
import { myLeaveAnimation } from '../animations/leave';
import {ModalService} from '../../services/modal/modal.service';

import { FacebookService } from 'src/services/facebook/facebook.service';
import { ActivatedRoute } from '@angular/router';
import { MealDetailPage } from './meal-detail/meal-detail.page';
import {Storage} from '@ionic/storage';
import { UserService } from 'src/services/user/user.service';



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
  public chefIds:string[] = [];
  public distances= [];
  private user;
  public myFavChefs = [];
  public orderedChefs;
  
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

  constructor(
    private mealService:MealService,
    private chefService:ChefService, 
    private fbService:FacebookService, 
    private ms:ModalService,
    private route:ActivatedRoute,
    private storage:Storage,
    private userService: UserService
  ) {
    
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
              this.userService.setUserId(this.userID);
              this.chefService.setUserId(this.userID);
              this.userService.getUserObservable().subscribe(res =>{
                  this.user = res;
                  this.userService.setUser(res);
                  if(res)
                    if (!res.zip_zipcode){
                      this.ms.openLogIn({'pageName':'Adress','parent':this, 'modalService': this.ms});
                    }
              });
            this.getChefs();  

          });
          }else
            this.ms.openLogIn({'pageName':'Facebook','parent':this,'modalService': this.ms}); 
        }
        this.getChefs();
      });
    }
    this.ms.setMealsPage(this);
  }

  public refresh():Promise<any>{
    this.chefs = [];
    this.distances = [];
    this.chefIds = [];
    this.meals = {};
    return this.getChefs()
  }

  public getChefs():Promise<any>{
    var promise = new Promise((resolve) => {
      this.chefService.setUserId(this.userID);
      this.userService.setUserId(this.userID);
      this.userService.setUser(this.user);
      this.chefService.getChefs(this.userID).subscribe(chefs=>{
        if (chefs == null)
          chefs = [];
        //load meals after chefs, this prevent creating a meal-item before chefs in initialized.
        this.mealService.getMeals().subscribe(meals=>{
            if(meals){
              meals.forEach(meal =>{
                this.meals[meal.mls_id] = meal;
              });
              this.meals = this.meals;
              chefs.forEach(chef => {
                // chef = JSON.parse(chef);
                chef.distance = "";
                this.chefs = [...this.chefs,chef];
                this.chefIds = [...this.chefIds,chef.mls_id];
                this.distances = [...this.distances,""];
              });
          }
          resolve('done');
          })
      });
    });

    return promise;
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
    this.slider.el.style.pointerEvents = 'none';
  }

  dragDown(){
    this.slider.el.style.pointerEvents = 'auto';
  }

  // Modals to create
  async openMealDetail(meal, chef, event){
    if(!event.target.className.includes('star')){
      this.ms.mealDetailModal(meal,chef)
    }
  }

  distanceChange(e){   
    for(var i = 0; i < e.length; i++){
      this.chefs[i].distance = e[i];
    }
    this.distances = e;
    // this.distances = e.sort();
    let temp = [...this.chefs];
    // temp.sort((a, b) => {
    //   return parseFloat(a.distance.replace(",","."))-parseFloat(b.distance.replace(",","."));});

    this.orderedChefs = temp;
  }
  
}
