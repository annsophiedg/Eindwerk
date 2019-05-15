import { Component, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.page.html',
  styleUrls: ['./add-meal.page.scss'],
})
export class AddMealPage {
  @Input() value: number;

  constructor(navParams: NavParams, public modal: ModalController) { }

  ngOnInit() {
    
  }

  hideModal(){
    this.modal.dismiss()
  }

  postMeal(){
    this.modal.dismiss({
      //some values to pass for sending to database
      // 'result': value
    })
  }
}
