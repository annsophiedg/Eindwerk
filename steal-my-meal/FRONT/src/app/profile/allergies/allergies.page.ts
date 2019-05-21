import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
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

  constructor(private userService:UserService, private generalService:GeneralService) { 
    userService.getUserAllergies().subscribe((result)=>(
      //save user allergies in array
      this.userAllergies = result,
      console.log("User Allergies: ",this.userAllergies),
      // check if user has allergies
      this.checkAllergies(this.userAllergies)
    ));
    generalService.getIngredients().subscribe((result)=>(
      //save DB ingredients in array
      this.dbIngredients = result,
      console.log("All Ingredients from DB: ",this.dbIngredients)
    ));
  }

  private checkAllergies(allergies) {
    if (allergies.length == 0) {
      this.hasAllergies = false
    } else {
      this.hasAllergies = true;
    }
  }

  public addInputValues(x) {
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

  public addAllergy(newAllergy) {
    console.log("new Allergy: ",newAllergy)
    
    //check if not already allergy
    console.log("allergies: ",this.userAllergies)

    //add new allergy as label on top
    this.userAllergies.push(newAllergy)
    //clear input
    //add ing_id in DB as fk_ing_all_id 
    console.log("new Allergy id: ",newAllergy["ing_id"])
  }

  ngOnInit() {
  }

}
