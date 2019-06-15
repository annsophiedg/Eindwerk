import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {

  public orders;
  public ms;

  @Input() 
  set service(params){
    this.ms = params
  }

  constructor(
    private userService:UserService) { 
    this.orders = this.userService.getCurrentOrders();
  }

  ngOnInit() {
  }

}
