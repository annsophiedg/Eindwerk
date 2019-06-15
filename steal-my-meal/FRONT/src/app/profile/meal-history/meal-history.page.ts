import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  constructor(
    private modal: ModalController,
    private chefService:ChefService,
    private ms:ModalService
  ) { 
    this.myMeals = this.chefService.getChefMeals();
    console.log('now:',this.now)
    console.log('meals:',this.myMeals)
  }

  ngOnInit() {
  }

  public hideModal(){
    console.log("hide modal in meal history :(")
    this.modal.dismiss()
  }

}
