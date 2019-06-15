import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  
  public userForm;
  public user:any;
  public ms;

  @Input() 
  set service(params){
    this.ms = params
  }
  
  constructor(
    private userService:UserService,
    private formBuilder: FormBuilder
    ) {
    this.user = this.userService.getUser();
    console.log("get user:", this.user);

    this.userForm = this.formBuilder.group({
      fullName: this.formBuilder.group({
        usr_firstname: [this.user['usr_firstname'], Validators.required, ],
        usr_lastname: [this.user['usr_lastname'], Validators.required]
      }),
      address: this.formBuilder.group({
        usr_street: [this.user['usr_street'], Validators.required],
        usr_housenumber: [this.user['usr_housenumber'], Validators.required],
        zip_zipcode: [this.user['zip_zipcode'], Validators.required],
        zip_city: [this.user['zip_city'], Validators.required]
      }),
      usr_email: [this.user['usr_email'], Validators.required],
      usr_telephone: [this.user['usr_telephone']]
    });

  }

  public onSubmit() {
    console.log(this.userForm.value)
    this.userService.setUserObservable(this.userForm.value).subscribe();
    this.ms.hideModal();

    let message = 'Your information was updated succesfully!';
    //modal animation, close modal after submit = false
    this.ms.presentLoading(message,false);
  }

  ngOnInit() {
  }

}
