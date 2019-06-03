import { Injectable } from '@angular/core';
import { Type } from '../../models/type';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  typesUrl:string = 'http://localhost:3000/BACK/api/types';

  constructor(private http:HttpClient ) { }

  //Get types
  getTypes():Observable<Type[]>{
    return this.http.get<Type[]>(`${this.typesUrl}`);
  }
}
