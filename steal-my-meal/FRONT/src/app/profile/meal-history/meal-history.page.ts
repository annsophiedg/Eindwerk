import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-meal-history',
  templateUrl: './meal-history.page.html',
  styleUrls: ['./meal-history.page.scss'],
})
export class MealHistoryPage implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

  public hideModal(){
    console.log(this);
    this.modal.dismiss()
  }

}
