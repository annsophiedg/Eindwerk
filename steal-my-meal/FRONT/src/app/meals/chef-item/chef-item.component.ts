import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chef-item',
  templateUrl: './chef-item.component.html',
  styleUrls: ['./chef-item.component.scss'],
})
export class ChefItemComponent implements OnInit {

  @Input() chef;

  constructor() { }

  ngOnInit() {}

}
