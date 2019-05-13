import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Meal } from'../models/meal';
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

  todosUrl:string = 'https://REST api Ann-Sophie';

  constructor(private http:HttpClient) { }

  //Get meals
  getMeals():Observable<Meal[]>{
    return this.http.get<Meal[]>(`${this.todosUrl}`);
  }

  //Delete meals
  deleteMeals(meal:Meal):Observable<Meal>{
    const url = `${this.todosUrl}/${meal.id}`; //fix meal id
    return this.http.delete<Meal>(url, httpOptions);
  }

  //Add meal
  addMeal(meal:Meal):Observable<Meal>{
    return this.http.post<Meal>(this.todosUrl, meal, httpOptions);
  }
}
