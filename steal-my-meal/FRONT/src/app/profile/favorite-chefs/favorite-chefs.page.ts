import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-favorite-chefs',
  templateUrl: './favorite-chefs.page.html',
  styleUrls: ['./favorite-chefs.page.scss'],
})
export class FavoriteChefsPage implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

  public hideModal(){
    console.log(this);
    this.modal.dismiss()
  }

}
