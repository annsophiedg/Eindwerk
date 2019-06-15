import { Component, OnInit, Input } from '@angular/core';
import { ChefService } from '../../../services/chef/chef.service';
import { ModalService } from '../../../services/modal/modal.service';
import * as moment from 'moment';

@Component({
  selector: 'app-meal-history',
  templateUrl: './meal-history.page.html',
  styleUrls: ['./meal-history.page.scss'],
})
export class MealHistoryPage implements OnInit {

  public myMeals:Array<any>;
  public now = moment(new Date()).format('YYYY-MM-DD');
  public ms;

  @Input() 
  set service(params){
    this.ms = params
  }

  constructor(
<<<<<<< HEAD
    private modal: ModalController,
    private chefService:ChefService,
    private ms:ModalService
=======
    private chefService:ChefService
>>>>>>> db0acebb5644fcd292b5ac82f15ccfacb371c4f6
  ) { 
    this.chefService.getChefMealsObservable().subscribe(result=>{
      this.myMeals = result
      console.log('meals:',this.myMeals)
    });
    // console.log('now:',this.now)
  }

  ngOnInit() {
  }

}
