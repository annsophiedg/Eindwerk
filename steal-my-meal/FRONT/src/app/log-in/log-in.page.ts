import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/services/user/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { constructor } from 'assert';
import {MealsPage} from 'src/app/meals/meals.page';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  public pageName;
  public parent;
  @Input() 
  set params(params){
    this.pageName = params['pageName'];
    this.parent = params['parent'];
    if(this.pageName == 'Adress')
      this.initUser();
  };

  public userForm;
  public user:any;

  constructor(
    private userService:UserService,
    private formBuilder: FormBuilder,
    private modal: ModalController
  ) { 
    
  }

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    clickable: false,
    type: 'progressbar'
  };

  ngOnInit() {

  }

  private initUser(){
    this.user = this.userService.getUser();

    this.userForm = this.formBuilder.group({
      fullName: this.formBuilder.group({
        usr_firstname: [this.user['usr_firstname']],
        usr_lastname: [this.user['usr_lastname']]
      }),
      address: this.formBuilder.group({
        usr_street: [this.user['usr_street']],
        usr_housenumber: [this.user['usr_housenumber']],
        zip_zipcode: [this.user['zip_zipcode'], Validators.required],
        zip_city: [this.user['zip_city'],Validators.required]
      }),
      usr_email: [this.user['usr_email']],
      usr_telephone: [this.user['usr_telephone']]
      
    });
  }

  public onSubmit() {
    this.userService.setUserObservable(this.userForm.value).subscribe();
    this.hideModal();
    this.parent.getChefs('test');
  }

  public hideModal(){
    this.modal.dismiss()
  }
}