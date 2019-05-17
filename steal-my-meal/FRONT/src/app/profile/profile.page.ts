import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  providers: [UserService]
})
export class ProfilePage implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
  }


}
