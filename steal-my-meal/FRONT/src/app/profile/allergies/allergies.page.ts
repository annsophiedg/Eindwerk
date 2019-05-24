import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { MealService } from '../../../services/meal/meal.service';
import { GeneralService } from 'src/services/general/general.service';

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.page.html',
  styleUrls: ['./allergies.page.scss'],
})
export class AllergiesPage implements OnInit {

  public dbIngredients;
  public dbAllergies;
  public inputValues = [];
  public userAllergies;
  public hasAllergies;

  newAllergy:object;
  all_id;
  allergyForm:FormGroup;
  all_name:AbstractControl;

  constructor(public modal:ModalController, 
    private formBuilder:FormBuilder, 
    private userService:UserService, 
    private mealService:MealService, 
    private generalService:GeneralService) { 
    this.allergyForm = this.formBuilder.group({
      all_name: ['', Validators.required]
    });

    this.all_name = this.allergyForm.controls['all_name'];

    userService.getUserAllergies().subscribe((result)=>(
      //save user allergies in array
      this.userAllergies = result,
      console.log("User Allergies: ",this.userAllergies),
      // check if user has allergies
      this.userHasAllergies(this.userAllergies)
    ));
    generalService.getIngredients().subscribe((result)=>(
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
    console.log("input: ",this.inputValues);
  }

  private showAllergy(newAllergy) {
    this.userAllergies.push(newAllergy);
    console.log(this.userAllergies);
  }

  private sendAllergy(newAllergy) {
    this.mealService.addIngredient(newAllergy).subscribe(res => {
      //get id of added ingredient
      this.all_id = JSON.parse(JSON.stringify(res))[0]['id'];
      console.log("allergyID:",this.all_id);
      //add id as a foreign key (userAllergy)
      this.userService.addAllergy({"all_id":this.all_id});
      return 'hallo';
    })
  }

  //when clicked on list item
  public addAllergy(newAllergy) {
    console.log('value:', newAllergy);
    this.showAllergy(newAllergy);
    this.sendAllergy(newAllergy);
  }

  //when entered in input
  public postAllergy() {
    //get value of new allergy
    this.newAllergy = {"ing_name":event.target[0].value};
    console.log("newAllergy:", this.newAllergy);
    //send new allergy to service
    this.sendAllergy(this.newAllergy);
    //show new allergy as label on page
    this.showAllergy(this.newAllergy);
  }

  ngOnInit() {
  }

}
