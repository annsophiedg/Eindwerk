import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chef } from '../../models/chef';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  private userId:number;
  private chefMeals:Array<any>;
  public isChef:boolean = false;
  
  chefsURL:string = 'http://localhost:3000/BACK/api/chefs';
  chefMealsURL:string;
  experienceURL:string;

  constructor(
    private http:HttpClient,
    private userService:UserService
  ) {
    this.userId = this.userService.getUserId();
    this.chefMealsURL = 'http://localhost:3000/BACK/api/chefMeals/' + this.userId;
    this.experienceURL = 'http://localhost:3000/BACK/api/experience/' + this.userId;
  }

  //Get all meals of chef
  getChefMealsObservable():Observable<any>{
    return this.http.get<any>(`${this.chefMealsURL}`)
  }

  //Save meals in chefMeals
  setChefMeals(meals){
    //save chef meals
    this.chefMeals = meals
    console.log("CHEF MEALS SAVED: ",this.chefMeals)
  }

  getChefMeals() {
    return this.chefMeals
  }

  //Get Experience
  getExperience():Observable<any>{
    return this.http.get<any>(`${this.experienceURL}`);
  }
  
  //Get chefs
  getChefs():Observable<any>{
    return this.http.get<any>(`${this.chefsURL}`);
  }

  //Add chef
  addChef(chef:Chef):Observable<Chef>{
    return this.http.post<Chef>(this.chefsURL, chef, httpOptions);
  }

  //Delete chef
  deleteChef(chef:Chef):Observable<Chef>{
    const url = `${this.chefsURL}/${chef.id}`;
    return this.http.delete<Chef>(url, httpOptions);
  }

  //Update chef
  updateChef(chef:Chef):Observable<Chef>{
    const url = `${this.chefsURL}/${chef.id}`;
    return this.http.put<Chef>(url, httpOptions);
  }


}
