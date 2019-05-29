import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user:any;

  constructor(
    private userService:UserService, 
    public ms:ModalService
  ) {
    this.userService.getUserObservable().subscribe((result)=>(
      this.user = result,
      console.log("GEGEVENS: ",this.user),
      //set user in userService
      this.userService.setUser(this.user)
    ));
  }

  ngOnInit() {
  }

}
