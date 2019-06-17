import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chef-card',
  inputs: ['chef'],
  templateUrl: './chef-card.component.html',
  styleUrls: ['./chef-card.component.scss'],
})
export class ChefCardComponent implements OnInit {

  @Input() public chef;
  @Input() public firstname;
  @Input() public lastname;
  @Input() public picture;

  constructor() { }

  ngOnInit() {}

}
