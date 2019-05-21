import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  todosUrl:string = 'http://localhost:3000/BACK/api/facebook';

  constructor(private http:HttpClient) { }

  //Get chefs
  getToken(){
    let FBurl = "https://www.facebook.com/v3.3/dialog/oauth?client_id=281257842778510&redirect_uri=http://localhost:3000/BACK/lib/Service/FbController.php&state={}";
    let token;
    this.http.get<any>(`${FBurl}`).subscribe();
    
    console.log(token);
    // return this.validateToken(token);
  }

  validateToken(token:string):Observable<any>{
    return this.http.post<any>(`${this.todosUrl}`, token);
  }
}
