import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ChefService } from '../../services/chef/chef.service';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user:any;
  public isChef:boolean = false;

  constructor(
    private userService:UserService,
    public chefService:ChefService, 
    public ms:ModalService
  ) {
    this.userService.getUserObservable().subscribe((result)=>{
      //save user
      this.user = result,
      console.log("PROFIEL GEGEVENS: ",this.user),
      //set user in userService
      this.userService.setUser(this.user)
    });
    this.chefService.getChefMealsObservable().subscribe((result)=>{
      //save chef meals in service
      chefService.setChefMeals(result);
      //is user a chef?
      if (result.length > 0) {
        this.isChef = true;
      }
      console.log('profile isChef',this.isChef)
    });
    
  }

  ngOnInit() {
  }

}
