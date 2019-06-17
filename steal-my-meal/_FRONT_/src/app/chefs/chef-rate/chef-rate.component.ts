import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chef-rate',
  templateUrl: './chef-rate.component.html',
  styleUrls: ['./chef-rate.component.scss'],
})
export class ChefRateComponent implements OnInit {
  @Input() public rating;

  constructor() { }

  ngOnInit() {}

}
