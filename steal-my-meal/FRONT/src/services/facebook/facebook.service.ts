import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
// import {Promise} from '@angular/core';

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
  userID = "";

  constructor(private http:HttpClient, private storage: Storage) {   
  }


  getToken(code:string):string{
    this.http.post(`${this.todosUrl}`,code, httpOptions).subscribe(res => {
      this.storage.set('id', res);
      return res;
    });
    return "";
  }

  getLogin():Promise<any>{
    this.storage.get('id').then(val=>console.log(val));
    return this.storage.get('id');
  }
}
