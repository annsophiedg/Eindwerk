import { Component, OnInit, Input } from '@angular/core';
import {Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { MealService } from '../../../services/meal/meal.service';

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
  public ms;

  @Input() 
  set service(params){
    this.ms = params
  }

  public allergyForm:FormGroup;
  public all_name:AbstractControl;

  constructor(
    private formBuilder:FormBuilder, 
    private userService:UserService, 
    private mealService:MealService
    ) { 
      this.allergyForm = this.formBuilder.group({
        all_name: ['', Validators.required]
      });

      this.all_name = this.allergyForm.controls['all_name'];

      this.setUserAllergies();

      this.mealService.getIngredients().subscribe((result)=>(
        //save DB ingredients in array
        this.dbIngredients = result,
        console.log("All Ingredients from DB: ",this.dbIngredients)
      ));
  }

  private setUserAllergies() {
    this.userService.getUserAllergies().subscribe((result)=>(
      //save user allergies in array
      this.userAllergies = result,
      // console.log("User Allergies: ",this.userAllergies),
      // check if user has allergies
      this.userHasAllergies(this.userAllergies)
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

  //newAllergy: string (input/target value)
  private sendAllergy(newAllergy) {
    //returns id of added ingredient to synchronise page
    this.mealService.addIngredient({"ing_name":newAllergy}).subscribe(res => {
      //get id of added ingredient
      let all_id = JSON.parse(JSON.stringify(res))[0]['id'];

      //add id as FK in user/allergies
      this.userService.addAllergy({"all_id":all_id}).subscribe((res)=>{
        this.setUserAllergies();
      });

      //show new allergy as label on page
      // this.showAllergy({"ing_id":this.all_id,"ing_name":newAllergy});
    })

    //modal animation
    let message = "Your allergy is succesfully added";
    this.ms.presentLoading(message,false);
  }

  //when clicked on list item
  public addAllergy(newAllergyObject) {
    let newAllergy = newAllergyObject["ing_name"];
    this.sendAllergy(newAllergy);
  }

  //when entered in input
  public postAllergy() {
    //get value of new allergy
    let newAllergy = event.target[0].value;

    //send new allergy to service
    this.sendAllergy(newAllergy);
  }

  //allergy: {'ing_id':'','ing_name':''}
  public deleteAllergy(allergy) {
    //delete in back
    this.userService.deleteUserAllergy(allergy).subscribe((res)=>{
      this.setUserAllergies();
    });
    
    //delete in front
    // this.hideAllergy(allergy);

    //modal animation
    let message = "Your allergy is succesfully deleted";
    this.ms.presentLoading(message,false);
  }

  ngOnInit() {
  }

}
