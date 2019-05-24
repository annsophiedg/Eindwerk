import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GeneralService {

  private allergiesURL = 'http://localhost:3000/BACK/api/allergies/';
  private ingredientsURL = 'http://localhost:3000/BACK/api/ingredients/';

  constructor(private http:HttpClient) {
  }

  public getIngredients() {
    return this.http.get(`${this.ingredientsURL}`)
  }
  
  public getAllergies() {
    return this.http.get(`${this.allergiesURL}`)
  }


}
