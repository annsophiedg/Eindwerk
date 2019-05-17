import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  public user:object;
  
  constructor(private userService:UserService) {
    this.user = { firstname: "a", lastname: "b", street: "c", housenumber: "13", zipcode: "5000", city: "d", email: "aezro@hot.com", telephone: "70978568457463", password: "xxx" };
  }

  //inputwaarden opslaan
  public saveFirstname(x) { 
    this.user["firstname"] = x;
  }
  public saveLastname(x) { 
    this.user["lastname"] = x;
  }
  public saveStreet(x) { 
    this.user["street"] = x;
  }
  public saveHousenumber(x) { 
    this.user["housenumber"] = x;
  }
  public saveZip(x) { 
    this.user["nr"] = x;
  }
  public saveCity(x) { 
    this.user["city"] = x;
  }
  public saveEmail(x) { 
    this.user["email"] = x;
  }
  public saveTelephone(x) { 
    this.user["telephone"] = x;
  }
  public savePassword(x) { 
    this.user["password"] = x;
  }

  ngOnInit() {
  }

}
