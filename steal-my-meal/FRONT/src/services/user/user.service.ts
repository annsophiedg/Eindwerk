import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
// import { url } from 'inspector';

// enkel nodig bij post
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  
  private userId = "10217728406738088";
  private userURL; 
  private orderURL;
  private experienceURL;
  private allergyURL;
  private favChefsURL;
  private deleteAllergyURL;
  private user;
  private orders;

  constructor(private http:HttpClient) {
    //get id from login

    // get user information
    this.userURL = APIEndpoint + 'users/' + this.userId;
    // get current orders of user
    this.orderURL = APIEndpoint + 'orders/' + this.userId;
    //get user experience (when chef)
    this.experienceURL = APIEndpoint + 'experience/' + this.userId;
    // get user allergies
    this.allergyURL = APIEndpoint + 'allergies/' + this.userId;
    // get favorite chefs
    this.favChefsURL = APIEndpoint + 'favChefs/' + this.userId;

  }

  public setUserId(id){
    this.userId = id;
    this.userURL = APIEndpoint + 'users/' + this.userId;
    this.allergyURL = APIEndpoint + 'allergies/' + this.userId;
    this.favChefsURL = APIEndpoint + 'favChefs/' + this.userId;
  }

  public getUserId() {
    return this.userId;
  }

  public getUserObservable():Observable<User> {
    return this.http.get<User>(`${this.userURL}`)
  }
  
  public setUserObservable(user:User):Observable<User> {
    return this.http.put<User>(this.userURL,user,httpOptions)
  }

  //use getUser instead
  public getUserInfo(id):Observable<any> {
    return this.http.get(`${this.userURL}`);
  }

  public setUser(u) {
    this.user = u;
  }

  public getUser() {
    return this.user;
  }

  // USER (CHEF) EXPERIENCE
  public getExperienceObservable():Observable<any> {
    return this.http.get(`${this.experienceURL}`)
  }

  // FAVORITE CHEFS
  public getUserFavChefs():Observable<any> {
    return this.http.get(`${this.favChefsURL}`)
  }

  // ORDERED MEALS
  public getCurrentOrdersObservable():Observable<any> {
    return this.http.get(`${this.orderURL}`)
  }

  public setCurrentOrders(res) {
    this.orders = res;
  }

  public getCurrentOrders() {
    return this.orders;
  }

  // USER ALLERGIES
  public getUserAllergies():Observable<any> {
    return this.http.get(`${this.allergyURL}`)
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
