import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  public userForm
  // public userForm = new FormGroup({
  //   fullName: new FormGroup({
  //     firstname: new FormControl(''),
  //     lastname: new FormControl('')
  //   }),
  //   address: new FormGroup({
  //     street: new FormControl(''),
  //     housenumber: new FormControl(''),
  //     zipcode: new FormControl(''),
  //     city: new FormControl('')
  //   }),
  //   email: new FormControl(''),
  //   telephone: new FormControl(''),
  // });

  public user;
  
  constructor(private userService:UserService,  private formBuilder: FormBuilder) {
    this.user = userService.getUser().subscribe((result)=>(
      this.user = result,
      console.log("GEGEVENS: ",this.user)
    ));
    this.userForm = formBuilder.group({
      firstname: ['', Validators.required, ],
      lastname: ['', Validators.required],
      street: ['', Validators.required],
      housenumber: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required]
    });
  }

  //inputwaarden opslaan
  public saveFirstname(x,y) { 
    this.user[0]["usr_firstname"] = x;
    console.log(x);
    console.log(y);
  }
  public saveLastname(x) { 
    this.user[0]["usr_lastname"] = x;
  }
  public saveStreet(x) { 
    this.user[0]["usr_street"] = x;
  }
  public saveHousenumber(x) { 
    this.user[0]["usr_housenumber"] = x;
  }
  public saveZip(x) { 
    this.user[0]["zip_zipcode"] = x;
  }
  public saveCity(x) { 
    this.user[0]["zip_city"] = x;
  }
  public saveEmail(x) { 
    this.user[0]["usr_email"] = x;
  }
  public saveTelephone(x) { 
    this.user[0]["usr_telephone"] = x;
  }
  public savePassword(x) { 
    this.user[0]["usr_password"] = x;
  }

  public onSubmit() {
    this.userService.setUser(this.user)
  }

  ngOnInit() {
  }

}
