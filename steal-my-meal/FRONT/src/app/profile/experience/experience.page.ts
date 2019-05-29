import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.page.html',
  styleUrls: ['./experience.page.scss'],
})
export class ExperiencePage implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

  public hideModal(){
    console.log(this);
    this.modal.dismiss()
  }

}
