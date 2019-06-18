import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chef } from '../../models/chef';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { environment } from '../../environments/environment';


const APIEndpoint = environment.APIEndpoint;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  private userId:string;
  private chefMeals:Array<any>;
  public isChef:boolean = false;
  
  chefsURL:string = APIEndpoint + 'chefs';
  chefMealsURL:string;
  chefDetailsURL:string;

  constructor(
    private http:HttpClient,
    private userService:UserService
  ) {
    this.userId = this.userService.getUserId();
    // this.chefMealsURL = APIEndpoint + 'chefMeals/' + this.userId;
    // this.chefDetailsURL = this.chefsURL + '/' + this.userId;
  }

  setUserId(id){
    this.userId = id;
    this.chefMealsURL = APIEndpoint + 'chefMeals/' + this.userId;
    this.chefDetailsURL = this.chefsURL + '/' + this.userId;
  }

  //Get all meals of chef
  getChefMealsObservable():Observable<any>{
    return this.http.get<any>(`${this.chefMealsURL}`)
  }

  //Save meals in chefMeals
  setChefMeals(meals){
    //save chef meals
    this.chefMeals = meals
  }
  
  getChefMeals() {
    return this.chefMeals
  }
  
  //Get chefs
  getChefs(userID = this.userId):Observable<any>{
      //Get chefs in the same zipcode as the user
      return this.http.get<any>(`${this.chefsURL}`+ '/' + userID);
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
