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
  orderUrl:string = APIEndpoint + 'orders';
  ingredientURL:string = APIEndpoint + 'ingredients';
  public ing_id;

  constructor(private http:HttpClient) { }

  //--MEALS

  //Get meals
  getMeals():Observable<any>{
    return this.http.get<any>(`${this.mealsUrl}`);
  }

  //Add meal
  addMeal(meal){
    return this.http.post(this.mealsUrl, meal, httpOptions);
  }

  updateMeal(meal):Observable<any>{
    return this.http.put(this.mealsUrl, meal, httpOptions);
  }

  //Subscribe to meal(update order)
  subscribeToMeal(subscribtion):Observable<any>{
    return this.http.put(this.orderUrl, subscribtion, httpOptions);
  }

  //--INGREDIENTS

  //get all ingredients
  getIngredients() {
    return this.http.get(`${this.ingredientURL}`)
  }

  //Get ingredients from one meal
  getMealIngredients($mealId){
    return this.http.get(`${this.ingredientURL}/${$mealId}`);
  }

  //Add ingredient
  addIngredient(ingredient){
    return this.http.post(this.ingredientURL, ingredient, httpOptions);
  }

  getUserAllergy(userID, mealID):Observable<any>{
    return this.http.get(`${this.mealsUrl}/${userID}/${mealID}`);
  }


}
