import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../../services/user/user.service';


@Component({
  selector: 'app-favorite-chefs',
  templateUrl: './favorite-chefs.page.html',
  styleUrls: ['./favorite-chefs.page.scss'],
})
export class FavoriteChefsPage implements OnInit {

  public favChefs;

  constructor(
    private modal: ModalController,
    private userService:UserService
  ) {
    this.userService.getUserFavChefs().subscribe((result)=>{
      this.favChefs = result;
      console.log(result)
    })
  }

  ngOnInit() {
  }

  public hideModal(){
    console.log(this);
    this.modal.dismiss()
  }

}
