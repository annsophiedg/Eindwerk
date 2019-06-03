import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { MealService } from '../../../services/meal/meal.service';
import { GeneralService } from '../../../services/general/general.service';
// import { ModalService } from '../../../services/modal/modal.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.page.html',
  styleUrls: ['./allergies.page.scss'],
})
export class AllergiesPage implements OnInit {

  public dbIngredients;
  public dbAllergies;
  public inputValues = [];
  public userAllergies = [];
  public hasAllergies;

  newAllergy:string;
  all_id;
  allergyForm:FormGroup;
  all_name:AbstractControl;
  hidden;

  constructor(
    private formBuilder:FormBuilder, 
    private userService:UserService, 
    private mealService:MealService, 
    private generalService:GeneralService,
    // public ms:ModalService,
    private modal: ModalController
    ) { 
      this.allergyForm = this.formBuilder.group({
        all_name: ['', Validators.required]
      });

      this.all_name = this.allergyForm.controls['all_name'];

      this.userService.getUserAllergies().subscribe((result)=>(
        //save user allergies in array
        this.userAllergies = result,
        console.log("User Allergies: ",this.userAllergies),
        // check if user has allergies
        this.userHasAllergies(this.userAllergies)
      ));

      this.generalService.getIngredients().subscribe((result)=>(
        //save DB ingredients in array
        this.dbIngredients = result,
        console.log("All Ingredients from DB: ",this.dbIngredients)
      ));
  }

  //check if user has any allergies (return true/false)
  private userHasAllergies(allergies) {
    if (allergies.length == 0) {
      this.hasAllergies = false
    } else {
      this.hasAllergies = true;
    }
  }

  // fill list of possible input values
  public showInputValues(x) {
    //start with empty array
    this.inputValues = [];
    //check all ingredients from db
    this.dbIngredients.forEach(ingredient => {
      //for each ingredient check if it includes input value
      if (ingredient["ing_name"].includes(x)) {
        //when true, add to array inputValues (to show on screen)
        this.inputValues.push(ingredient)
      }
    });
    // console.log("input: ",this.inputValues);
  }

  private showAllergy(newAllergy) {
    this.userAllergies.push(newAllergy);
    console.log(this.userAllergies);
  }

  private hideAllergy(allergy) {
    let array = this.userAllergies;
    for (let i=0; i<array.length; i++) {
      if (array[i] === allergy) {
        array.splice(i,i);
      }
    }
  }

  private sendAllergy(newAllergy) {
    console.log('sss',newAllergy);
    this.mealService.addIngredient({"ing_name":newAllergy}).subscribe(res => {
      //get id of added ingredient
      this.all_id = JSON.parse(JSON.stringify(res))[0]['id'];
      console.log("allergyID:",this.all_id);
      //add id as a foreign key (userAllergy)
      this.userService.addAllergy({"all_id":this.all_id});
      //show new allergy as label on page
      this.showAllergy(
        {"ing_id":this.all_id,"ing_name":newAllergy}
        );
    })
  }

  //when clicked on list item
  public addAllergy(newAllergyObject) {
    this.newAllergy = newAllergyObject["ing_name"];
    this.sendAllergy(this.newAllergy);
  }

  //when entered in input
  public postAllergy() {
    //get value of new allergy
    this.newAllergy = event.target[0].value;
    //send new allergy to service
    this.sendAllergy(this.newAllergy);
  }

  public deleteAllergy(allergy) {
    console.log("to delete:",allergy);
    //delete in back
    this.userService.deleteUserAllergy(allergy);
    //delete in front
    this.hideAllergy(allergy);
  }

  public hideModal(){
    this.modal.dismiss()
  }

  ngOnInit() {
  }

}
