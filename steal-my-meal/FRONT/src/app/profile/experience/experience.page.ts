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
    this.userService.getExperienceObservable().subscribe(result=>{
      console.log('EXPERIENCE IN PAGE:', result)
      this.cookedMeals = result.mls_cooked
      this.finishedOrders =   result.ord_finished
      this.avgRating = result.avg_rating
    })
    

  }

  ngOnInit() {
  }

  public hideModal(){
    this.modal.dismiss()
  }

}
