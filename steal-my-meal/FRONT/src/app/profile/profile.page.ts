import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user;

  constructor(private userService:UserService, private ms:ModalService) {
    this.user = userService.getUser().subscribe((result)=>(
      this.user = result,
      console.log("GEGEVENS: ",this.user)
    ));
  }


  ngOnInit() {
  }

}
