import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ChefService } from '../../services/chef/chef.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user:any;
  public isChef:boolean = false;
  public ord_amount = 0;
  public ms;

  @Input() 
  set params(params){
    this.ms = params;
  };

  constructor(
    private userService:UserService,
    public chefService:ChefService
  ) {
    this.getUserData();
    this.getCurrentOrders();
  }

  getUserData() {
    // get user information and save data
    this.userService.getUserObservable().subscribe((result)=>{
      //save user
      this.user = result;
      //check if user is chef
      if (this.user["fk_usr_chef_id"]) {
        this.isChef = true;
        //if user is chef, get user meals
        this.getCookedMeals();
      };
      //set user in userService
      this.userService.setUser(this.user)
    });
  }

  getCurrentOrders() {
    //get current orders of the user and save in userService
    this.userService.getCurrentOrdersObservable().subscribe((result)=>{
      //save result
      this.userService.setCurrentOrders(result),
      console.log("ORDERED MEALS to pick up:",result, result.length)
      //count amount of all orders
      for (let o=0; o<result.length; o++) {
        this.ord_amount += parseInt(result[o]['ord_amount'],10)
      }
    })
  }

  getCookedMeals() {
    this.chefService.getChefMealsObservable().subscribe((result)=>{
      //save chef meals in service
      this.chefService.setChefMeals(result);
      console.log('profile isChef',this.isChef);
    });
  }

  ngOnInit() {
  }

}
