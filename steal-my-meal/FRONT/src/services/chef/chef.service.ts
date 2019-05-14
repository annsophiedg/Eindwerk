import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chef } from '../../models/chef';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  todosUrl:string = 'http://localhost:3000/BACK/api/chefs';

  constructor(private http:HttpClient) { }

  //Get chefs
  getChefs():Observable<Chef[]>{
    return this.http.get<Chef[]>(`${this.todosUrl}`);
  }

  //Add chef
  addChef(chef:Chef):Observable<Chef>{
    return this.http.post<Chef>(this.todosUrl, chef, httpOptions);
  }

  //Delete chef
  deleteChef(chef:Chef):Observable<Chef>{
    const url = `${this.todosUrl}/${chef.id}`;
    return this.http.delete<Chef>(url, httpOptions);
  }

  //Update chef
  updateChef(chef:Chef):Observable<Chef>{
    const url = `${this.todosUrl}/${chef.id}`;
    return this.http.put<Chef>(url, httpOptions);
  }


}
