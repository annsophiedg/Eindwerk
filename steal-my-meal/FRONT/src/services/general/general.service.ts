import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})



export class GeneralService {

  private allergiesURL = APIEndpoint + 'allergies/';
  private ingredientsURL = APIEndpoint + 'ingredients/';

  constructor(private http:HttpClient) {
  }

  public getIngredients() {
    return this.http.get(`${this.ingredientsURL}`)
  }
  
  public getAllergies() {
    return this.http.get(`${this.allergiesURL}`)
  }


}
