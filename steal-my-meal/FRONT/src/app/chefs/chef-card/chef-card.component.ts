import { Component, OnInit, Input } from '@angular/core';
import { Chef } from 'src/models/chef';

@Component({
  selector: 'app-chef-card',
  inputs: ['chef'],
  templateUrl: './chef-card.component.html',
  styleUrls: ['./chef-card.component.scss'],
})
export class ChefCardComponent implements OnInit {

  // @Input() public chef;

  constructor() { }

  ngOnInit() {}

}
