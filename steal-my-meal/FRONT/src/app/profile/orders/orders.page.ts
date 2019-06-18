import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { now } from 'moment';

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
  public today = formatDate( new Date(), "yyyy-MM-dd", "en_US");
  public orderPickedUp:boolean = false;
  public ms;

  @Input() 
  set service(params){
    this.ms = params
  }

  constructor(
    private userService:UserService
  ) { 
    this.orders = this.userService.getCurrentOrders();
    console.log('today:', this.today)
  }

  voucherIsSwiped(meal_id) {
    console.log('swiped');
    //set ord_is_delivered = 1 in db for mls_id & cons_id
    //and return new ord_is_delivered
    this.userService.finishOrderObservable(meal_id).subscribe( (res) => {
      console.log('finish order',res[0].ord_is_delivered)
      //set result ord_is_delivered
      this.orders[0].ord_is_delivered = res[0].ord_is_delivered
      console.log('orders after picked up: ', this.orders);
    });
    
  }

  ngOnInit() {
  }

}
