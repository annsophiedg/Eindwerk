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
      console.log('chef',this.chef);

      //check if this chef is myFavChef
      for (let i=0; i<this.myFavChefs.length; i++) {
        if (this.chef.chef_id == this.myFavChefs[i]||this.chef.usr_id == this.myFavChefs[i]){
          this.isFavChef = true;
          break;
        } else {
          this.isFavChef = false;
        }
      }
    })
  }

  addFavChef() {
    let id:string;
    
    if (this.chef.chef_id) {
      id = this.chef.chef_id
    } else if (this.chef.usr_id) {
      id = this.chef.usr_id
    }

    this.userService.addUserFavChef(id).subscribe(res=>{
      this.checkFavChef();
    });
  }

  deleteFavChef() {
    let id:string;
    
    if (this.chef.chef_id) {
      id = this.chef.chef_id
    } else if (this.chef.usr_id) {
      id = this.chef.usr_id
    }
    
    this.userService.deleteUserFavChef(id).subscribe(res=>{
      this.checkFavChef();
    });

  }

  ngOnInit() {}

}
