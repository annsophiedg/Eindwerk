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
  // public isChef:boolean = false;
  private chefMeals:Array;

  
  chefsURL:string = 'http://localhost:3000/BACK/api/chefs';
  chefMealsURL:string;

  constructor(
    private http:HttpClient,
    private userService:UserService
  ) {
    this.userId = this.userService.getUserId();
    this.chefMealsURL = 'http://localhost:3000/BACK/api/chefMeals/' + this.userId;
    // this.setChefMeals();
  }

  //Get all meals of chef
  getChefMealsObservable():Observable<any>{
    return this.http.get<any>(`${this.chefMealsURL}`)
  }
  
  //Get all meals of chef
  setChefMeals(){
    this.http.get<any>(`${this.chefMealsURL}`).subscribe((result)=>{
      this.chefMeals = result
      console.log("CHEF MEALS: ",this.chefMeals)
      this.isChef()
    });
  }

  isChef(){
    if (this.chefMeals.length > 0) {
      return true;
    }
    return false
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
