import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {

  public orders;

  constructor(
    private modal:ModalController,
    private userService:UserService) { 
    this.orders = this.userService.getCurrentOrders();
  }

  public hideModal(){
    this.modal.dismiss()
  }

  ngOnInit() {
  }

}
