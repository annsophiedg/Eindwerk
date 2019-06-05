import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
// import { ModalService } from '../../../services/modal/modal.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  
  public userForm;
  public user:any;
  
  constructor(
    private userService:UserService,
    private formBuilder: FormBuilder,
    private modal: ModalController,
    // public ms:ModalService
    ) {
    this.user = this.userService.getUser();
    console.log("get user:", this.user);

    this.userForm = this.formBuilder.group({
      fullName: this.formBuilder.group({
        firstname: ['', Validators.required, ],
        lastname: ['', Validators.required]
      }),
      address: this.formBuilder.group({
        street: ['', Validators.required],housenumber: ['', Validators.required],
        zipcode: ['', Validators.required],city: ['', Validators.required]
      }),
      email: ['', Validators.required],
      telephone: ['', Validators.required]
    });
  }

  //inputwaarden opslaan
  public saveFirstname(x) { 
    this.user["usr_firstname"] = x;
    //pass name to function to make one function instead of more
    // console.log(x);
    // console.log(y.id);
  }

  public saveLastname(x) { 
    this.user["usr_lastname"] = x;
  }
  public saveStreet(x) { 
    this.user["usr_street"] = x;
  }
  public saveHousenumber(x) { 
    this.user["usr_housenumber"] = x;
  }
  public saveZip(x) { 
    this.user["zip_zipcode"] = x;
  }
  public saveCity(x) { 
    this.user["zip_city"] = x;
  }
  public saveEmail(x) { 
    this.user["usr_email"] = x;
  }
  public saveTelephone(x) { 
    this.user["usr_telephone"] = x;
  }
  public savePassword(x) { 
    this.user["usr_password"] = x;
  }

  public onSubmit() {
    this.userService.setUserObservable(this.user).subscribe();
  }

  ngOnInit() {
  }

  public hideModal(){
    console.log('hideModel in EditUser :(');
    this.modal.dismiss()
  }

}
