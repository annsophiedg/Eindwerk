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
    // console.log('follow chef_id: ', this.chef)
    this.userService.getUserFavChefs().subscribe((result)=>{
      this.myFavChefs = result;
      console.log(this.myFavChefs);
      console.log('follow chef_id: ', this.chef.chef_id)

      //check if this chef is myFavChef
      for (let i=0; i<this.myFavChefs.length; i++) {
        if (this.chef.chef_id == this.myFavChefs[i]){
          this.isFavChef = true;
          break;
        }
      }

    })
    // this.isFavChef = this.chefService.checkFavChef(chefId) 
  }

  addFavChef() {
    this.isFavChef = !this.isFavChef;
    this.userService.addUserFavChef(this.chef.chef_id);
  }

  deleteFavChef() {
    this.isFavChef = !this.isFavChef;
    this.userService.deleteUserFavChef(this.chef.chef_id);

  }

  ngOnInit() {}

}
