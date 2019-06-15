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
    private chefService:ChefService
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
