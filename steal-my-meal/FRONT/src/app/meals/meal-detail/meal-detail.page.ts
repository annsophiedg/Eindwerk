import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.page.html',
  styleUrls: ['./meal-detail.page.scss'],
})
export class MealDetailPage implements OnInit {

  @Input() meal;
  @Input() chef;
  private profilePath = "../../../assets/img/profile_pic.jpg";

  constructor() { }

  ngOnInit() {
    console.log(this.chef);
    console.log(this.meal);
  }

}
