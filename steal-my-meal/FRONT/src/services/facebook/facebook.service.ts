import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  todosUrl:string = 'http://localhost:3000/BACK/api/facebook';

  constructor(private http:HttpClient) { }


  getToken(code:string){
    this.http.post(`${this.todosUrl}`,code, httpOptions).subscribe(res => {
       let token = res;
      console.log(res);
      return token;
    });
    return "";
  }
}
