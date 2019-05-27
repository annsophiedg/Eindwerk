import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

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

  private id:number = 3;
  private userURL; 
  private allergyURL;
  private deleteAllergyURL;

  constructor(private http:HttpClient) {
    //get id from login
    this.userURL = 'http://localhost:3000/BACK/api/users/' + this.id;
    this.allergyURL = 'http://localhost:3000/BACK/api/allergies/' + this.id;
  }

  public setUserId(id){
    this.id = id
  }

  public getUser():Observable<User> {
    return this.http.get<User>(`${this.userURL}`)
  }

  public getUserAllergies() {
    return this.http.get<User[]>(`${this.allergyURL}`)
  }

  public setUser(user:User):Observable<User[]> {
    console.log(user)
    return this.http.post<User[]>(`${this.userURL}`,httpOptions)
  }

  /**
   * addAllergy
   */
  public addAllergy(allergy) {
    return this.http.post(this.allergyURL, allergy, httpOptions).subscribe()
  }

  public setAllergyOfUser(allergy) {
    this.http.post(this.allergyURL, allergy, httpOptions).subscribe()
  }

  public deleteUserAllergy(allergy) {
    this.deleteAllergyURL = 'http://localhost:3000/BACK/api/allergies/' + this.id + ',' + allergy["ing_id"];
    this.http.delete(this.deleteAllergyURL, allergy).subscribe()
  }
  
}
