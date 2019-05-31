import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChefService } from '../../../services/chef/chef.service';
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
    private chefService:ChefService
  ) { 
    this.chefService.getExperience().subscribe((result)=>{
      this.cookedMeals = result[0].mls_cooked
      this.finishedOrders = result[0].ord_finished
      this.avgRating = result[0].avg_rating
    })

  }

  ngOnInit() {
  }

  public hideModal(){
    console.log(this);
    this.modal.dismiss()
  }

}
