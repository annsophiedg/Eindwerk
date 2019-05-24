import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Meal } from'../../models/meal';
import { Observable } from 'rxjs';

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
  mealUrl:string = 'http://localhost:3000/BACK/api/meal';

  constructor(private http:HttpClient) { }

  //Get meals
  getMeals():Observable<Meal[]>{
    return this.http.get<Meal[]>(`${this.mealsUrl}`);
  }

  //Add meal
  addMeal(meal){
    return this.http.post(this.mealsUrl, meal, httpOptions).subscribe();
  }

  //Delete meal
  deleteMeal(meal:Meal):Observable<Meal>{
    const url = `${this.mealUrl}/${meal.id}`;
    return this.http.delete<Meal>(url, httpOptions);
  }

  //Update meal
  updateMeal(meal:Meal):Observable<Meal>{
    const url = `${this.mealUrl}/${meal.id}`;
    return this.http.put<Meal>(url, httpOptions);
  }


}
