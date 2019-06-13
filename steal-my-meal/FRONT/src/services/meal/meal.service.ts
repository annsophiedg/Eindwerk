import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Meal } from'../../models/meal';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const APIEndpoint = environment.APIEndpoint;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MealService {

  mealsUrl:string = APIEndpoint + 'meals';
  ingredientURL:string = APIEndpoint + 'ingredients';
  public ing_id;

  constructor(private http:HttpClient) { }

  //Get meals
  getMeals():Observable<any>{
    return this.http.get<any>(`${this.mealsUrl}`);
  }

  //Get ingredients from one meal
  getMealIngredients($mealId){
    return this.http.get(`${this.ingredientURL}/${$mealId}`);
  }

  //Add meal
  addMeal(meal){
    return this.http.post(this.mealsUrl, meal, httpOptions).subscribe(outcome =>(console.log(outcome=meal) ));
  }

  //Subscribe to meal(update order)
  subscribeToMeal(subscribtion){
    return this.http.put(this.mealsUrl, subscribtion, httpOptions).subscribe();
  }

  //Add ingredient
  addIngredient(ingredient){
    return this.http.post(this.ingredientURL, ingredient, httpOptions);
  }

  //get all ingredients
  public getIngredients() {
    return this.http.get(`${this.ingredientURL}`)
  }


}
