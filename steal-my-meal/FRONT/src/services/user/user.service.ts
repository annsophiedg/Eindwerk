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
  private ratingURL;
  private experienceURL;
  private allergyURL;
  private favChefsURL;
  private pageFavChefsURL;
  private user;
  private orders;

  constructor(private http:HttpClient) {
  }

  public setUserId(id){
    this.userId = id;
    // get user information
    this.userURL = APIEndpoint + 'users/' + this.userId;
    // get current orders of user
    this.orderURL = APIEndpoint + 'orders/' + this.userId;
    // get picked up, not rated orders of user
    this.ratingURL = APIEndpoint + 'ratings/' + this.userId;
    //get user experience (when chef)
    this.experienceURL = APIEndpoint + 'experience/' + this.userId;
    // get user allergies
    this.allergyURL = APIEndpoint + 'allergies/' + this.userId;
    // get favorite chefs
    this.favChefsURL = APIEndpoint + 'favChefs/' + this.userId;
    this.pageFavChefsURL = APIEndpoint + 'pageFavChefs/' + this.userId;
  }

  public getUserId() {
    return this.userId;
  }

  public getUserObservable():Observable<any> {
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
  public getUserpageFavChefs():Observable<any> {
    return this.http.get(`${this.pageFavChefsURL}`)
  }

  public getUserFavChefs():Observable<any> {
    return this.http.get(`${this.favChefsURL}`)
  }

  public addUserFavChef(chef_id) {
    return this.http.post(`${this.favChefsURL}`, chef_id, httpOptions);
  }

  public deleteUserFavChef(chef_id) {
    let deleteFavChefURL = this.favChefsURL + ',' + chef_id;
    return this.http.delete(`${deleteFavChefURL}`);
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

  // finish order (set is_delivered on true (1) in DB)
  public finishOrderObservable(mls_id) {
    return this.http.post(this.orderURL, mls_id, httpOptions)
  }

  //get user orders to rate
  public getOrdersToRate(){
    return this.http.get(`${this.ratingURL}`)
  }

  //set fk_rat_id in orders
  public rateOrder(ord_rat){
    return this.http.post(`${this.ratingURL}`, JSON.stringify(ord_rat), httpOptions);
  }

  // USER ALLERGIES
  public getUserAllergies():Observable<any> {
    return this.http.get(`${this.allergyURL}`)
  }

  public addAllergy(allergy) {
    return this.http.post(this.allergyURL, allergy, httpOptions)
  }

  public setAllergyOfUser(allergy) {
    this.http.post(this.allergyURL, allergy, httpOptions).subscribe()
  }

  public deleteUserAllergy(allergy) {
    let deleteAllergyURL = this.allergyURL + ',' + allergy["ing_id"];
    return this.http.delete(deleteAllergyURL, allergy)
  }
  
}
