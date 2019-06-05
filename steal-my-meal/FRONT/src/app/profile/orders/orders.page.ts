import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ModalController } from '@ionic/angular';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})

@Pipe({
  name: 'dateFormat'
})

export class OrdersPage implements OnInit {

  public orders;

  constructor(
    private userService:UserService,
    private modal:ModalController) { 
    this.orders = this.userService.getCurrentOrders();
    console.log("orders: ",this.orders)
    console.log(typeof(this.orders[0].mls_date))
  }

  hideModal(){
    this.modal.dismiss()
  }

  ngOnInit() {
  }

}
