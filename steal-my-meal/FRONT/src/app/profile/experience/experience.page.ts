import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../../services/user/user.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.page.html',
  styleUrls: ['./experience.page.scss'],
})
export class ExperiencePage implements OnInit {
  cookedMeals:number;
  finishedOrders:number;
  avgRating:number;

  constructor(
    private modal:ModalController,
    public userService:UserService
  ) { 
    this.cookedMeals = this.userService.getUser().mls_cooked
    this.finishedOrders = this.userService.getUser().ord_finished
    this.avgRating = this.userService.getUser().avg_rating

  }

  ngOnInit() {
  }

  public hideModal(){
    this.modal.dismiss()
  }

}
