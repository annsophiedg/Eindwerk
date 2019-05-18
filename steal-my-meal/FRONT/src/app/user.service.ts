import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

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
  private URL;

  constructor(private http:HttpClient) {
    //get id from login
    this.URL = 'http://localhost:3000/BACK/api/users/' + this.id;
  }

  public setUserId(id){
    this.id = id
  }

  public getUser():Observable<User[]> {
    return this.http.get<User[]>(`${this.URL}`)
  }

  public setUser(user:User):Observable<User[]> {
    console.log(user)
    return this.http.post<User[]>(`${this.URL}`,httpOptions)
    
  }

}
