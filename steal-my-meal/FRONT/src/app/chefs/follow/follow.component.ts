import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ChefService } from '../../../services/chef/chef.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss'],
})
export class FollowComponent implements OnInit {
  @Input() chef;
  @Input() favChefs;

  myFavChefs;
  isFavChef:boolean = false;

  constructor(
    private userService:UserService,
    private chefService:ChefService
  ) {
    this.checkFavChef();
  }

  //set isFavChef to true if favorite chef
  checkFavChef() {
    this.userService.getUserFavChefs().subscribe((result)=>{
      this.myFavChefs = result;

      //check if this chef is myFavChef
      for (let i=0; i<this.myFavChefs.length; i++) {
        if (this.chef.chef_id == this.myFavChefs[i]){
          this.isFavChef = true;
          break;
        } else {
          this.isFavChef = false;
        }
      }
    })
  }

  addFavChef() {
    // this.isFavChef = !this.isFavChef;

    this.userService.addUserFavChef(this.chef.chef_id).subscribe(res=>{
      this.checkFavChef();
    });
  }

  deleteFavChef() {
    // this.isFavChef = !this.isFavChef;
    this.userService.deleteUserFavChef(this.chef.chef_id).subscribe(res=>{
      this.checkFavChef();
    });

  }

  ngOnInit() {}

}
