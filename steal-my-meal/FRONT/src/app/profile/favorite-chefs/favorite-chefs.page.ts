import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-favorite-chefs',
  templateUrl: './favorite-chefs.page.html',
  styleUrls: ['./favorite-chefs.page.scss'],
})
export class FavoriteChefsPage implements OnInit {

  public favChefs;
  public ms;

  @Input() 
  set service(params){
    this.ms = params
  }

  constructor(
    private userService:UserService
  ) {
    this.userService.getUserpageFavChefs().subscribe((result)=>{
      this.favChefs = result;
      console.log(result)

      this.favChefs.forEach(chef => {
        console.log(chef)
      });
    })
  }

  ngOnInit() {
    
  }

}
