import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Meal } from'../../models/meal';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MealService {

  todosUrl:string = 'http://localhost:3000/steal-my-meal/_BACK_/api/meals';

  constructor(private http:HttpClient) { }

  //Get meals
  getMeals():Observable<Meal[]>{
    return this.http.get<Meal[]>(`${this.todosUrl}`);
  }

  //Add meal
  addMeal(meal:Meal):Observable<Meal>{
    return this.http.post<Meal>(this.todosUrl, meal, httpOptions);
  }

  //Delete meal
  deleteMeal(meal:Meal):Observable<Meal>{
    const url = `${this.todosUrl}/${meal.id}`;
    return this.http.delete<Meal>(url, httpOptions);
  }

  //Update meal
  updateMeal(meal:Meal):Observable<Meal>{
    const url = `${this.todosUrl}/${meal.id}`;
    return this.http.put<Meal>(url, httpOptions);
  }


}
