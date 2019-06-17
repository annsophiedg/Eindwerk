import { Injectable } from '@angular/core';
import { Type } from '../../models/type';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  typesUrl:string = APIEndpoint + 'types';

  constructor(private http:HttpClient ) { }

  //Get types
  getTypes():Observable<Type[]>{
    return this.http.get<Type[]>(`${this.typesUrl}`);
  }
}
