import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user;

  constructor(private userService:UserService) {
    this.user = userService.getUser().subscribe((result)=>(
      this.user = result,
      console.log("GEGEVENS: ",this.user)
    ));
  }

  ngOnInit() {
  }

}
