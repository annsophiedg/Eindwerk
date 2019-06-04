import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  public orders;

  constructor(private userService:UserService) { 
    this.orders = this.userService.getCurrentOrders();
    console.log("orders: ",this.orders)
  }

  ngOnInit() {
  }

}
