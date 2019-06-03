import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Meal } from'../../models/meal';
import { Observable } from 'rxjs';
import { AllergiesPage } from 'src/app/profile/allergies/allergies.page';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MealService {

  mealsUrl:string = 'http://localhost:3000/BACK/api/meals';
  ingredientURL:string = 'http://localhost:3000/BACK/api/ingredients';
  public ing_id;

  constructor(private http:HttpClient) { }

  //Get meals
  getMeals():Observable<any>{
    return this.http.get<any>(`${this.mealsUrl}`);
  }

  //Add meal
  addMeal(meal){
    return this.http.post(this.mealsUrl, meal, httpOptions).subscribe();
  }

  //Delete meal
  deleteMeal(meal:Meal):Observable<Meal>{
    const url = `${this.mealsUrl}/${meal.id}`;
    return this.http.delete<Meal>(url, httpOptions);
  }

  //Update meal
  updateMeal(meal:Meal):Observable<Meal>{
    const url = `${this.mealsUrl}/${meal.id}`;
    return this.http.put<Meal>(url, httpOptions);
  }

  //Add ingredient
  addIngredient(ingredient){
    return this.http.post(this.ingredientURL, ingredient, httpOptions);
  }


}
