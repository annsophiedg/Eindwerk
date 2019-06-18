import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.page.html',
  styleUrls: ['./experience.page.scss'],
})

export class ExperiencePage implements OnInit {
  public cookedMeals:number;
  public finishedOrders:number;
  public avgRating:number;
  public ms;

  @Input() 
  set service(params){
    this.ms = params
  }

  constructor(
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

}
