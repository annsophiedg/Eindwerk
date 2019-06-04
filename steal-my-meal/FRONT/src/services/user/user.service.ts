import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
// import { url } from 'inspector';

// enkel nodig bij post
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userId = "10217728406738088";
  private userURL; 
  private orderURL;
  private allergyURL;
  private favChefsURL;
  private deleteAllergyURL;
  private user;
  private orders;

  constructor(private http:HttpClient) {
    //get id from login
    this.userURL = 'http://localhost:3000/BACK/api/users/' + this.userId;
    this.orderURL = 'http://localhost:3000/BACK/api/orders/' + this.userId;
    this.allergyURL = 'http://localhost:3000/BACK/api/allergies/' + this.userId;
    this.favChefsURL = 'http://localhost:3000/BACK/api/favChefs/' + this.userId;

  }

  public setUserId(id){
    this.userId = id
  }

  public getUserId() {
    return this.userId;
  }

  public getUserObservable():Observable<User> {
    console.log(this.userURL)
    return this.http.get<User>(`${this.userURL}`)
  }
  
  public setUserObservable(user:User):Observable<User> {
    console.log('change user details: ',user)
    return this.http.put<User>(this.userURL,user,httpOptions)
  }

  //use getUser instead
  public getUserInfo(id):Observable<any> {
    return this.http.get(`${this.userURL}`);
  }

  public setUser(u) {
    this.user = u;
    console.log("user set: ",this.user)
  }

  public getUser() {
    return this.user;
  }

  // FAVORITE CHEFS
  public getUserFavChefs() {
    return this.http.get<User[]>(`${this.favChefsURL}`)
  }

  // ORDERED MEALS
  public getCurrentOrdersObservable() {
    return this.http.get<User[]>(`${this.orderURL}`)
  }

  public setCurrentOrders(res) {
    this.orders = res;
  }

  public getCurrentOrders(res) {
    return this.orders;
  }

  // USER ALLERGIES
  public getUserAllergies() {
    return this.http.get<User[]>(`${this.allergyURL}`)
  }

  public addAllergy(allergy) {
    return this.http.post(this.allergyURL, allergy, httpOptions).subscribe()
  }

  public setAllergyOfUser(allergy) {
    this.http.post(this.allergyURL, allergy, httpOptions).subscribe()
  }

  public deleteUserAllergy(allergy) {
    this.deleteAllergyURL = 'http://localhost:3000/BACK/api/allergies/' + this.userId + ',' + allergy["ing_id"];
    this.http.delete(this.deleteAllergyURL, allergy).subscribe()
  }
  
}
