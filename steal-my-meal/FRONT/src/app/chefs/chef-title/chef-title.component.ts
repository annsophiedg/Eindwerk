import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chef-title',
  templateUrl: './chef-title.component.html',
  styleUrls: ['./chef-title.component.scss'],
})
export class ChefTitleComponent implements OnInit {

  @Input() public chef;
  rating:number = 0;
  mlsExp:number = 0;
  experience:number = 1;

  constructor() {
  }

  ngOnInit() {
    console.log('chef-title',this.chef)
    this.mlsExp = parseInt(this.chef.mls_cooked)
    if (this.chef.avg_rating != null) {
      this.rating = parseInt(this.chef.avg_rating)
    }

    if (this.rating>10 && this.mlsExp>=5) {
      this.experience = 4;
    } else if (this.rating>7 && this.mlsExp>=3) {
      this.experience = 3;
    } else if (this.rating>4 && this.mlsExp>=2) {
      this.experience = 2;
    }
    
  }

}
