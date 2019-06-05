import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Adress } from 'src/models/adress';
// import {Promise} from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  todosUrl:string = 'http://localhost:3000/BACK/api/maps';

  constructor(private http:HttpClient, private storage: Storage) {   
  }

  getLocation(adress:Adress):Observable<any>{
    let adstr = adress.adress.replace(" " , '+');
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+adstr+'&key=AIzaSyBZJFDnYQk3hD_4UFNaf1MLNAdZ7kJH4vs'
    return this.http.get(`${url}`);
  }
}
