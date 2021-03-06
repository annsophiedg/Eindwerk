import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
// import {Promise} from '@angular/core';
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
export class FacebookService {

  todosUrl:string = APIEndpoint + 'facebook';
  userID = "";

  constructor(private http:HttpClient, private storage: Storage) {   
  }


  getToken(code:string):Observable<any>{
    return this.http.post(`${this.todosUrl}`,code, httpOptions);
  }
}
