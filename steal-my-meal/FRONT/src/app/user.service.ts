import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  private user;

  constructor(private http:HttpClient) {
    // console.log("GEGEVENS: ",this.user)
    this.getUser(this.id);
  }

  private getUser(id) {
    this.http.get('http://localhost:3000/steal-my-meal/BACK/api/users/'+this.id, httpOptions).subscribe((result)=>(
      this.user = result,
      console.log("GEGEVENS: ",this.user)
    ));
  }
}
