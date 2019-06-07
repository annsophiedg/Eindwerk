import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Adress } from 'src/models/adress';
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
export class MapService {

  todosUrl:string = APIEndpoint + 'maps';

  constructor(private http:HttpClient, private storage: Storage) {   
  }

  getLocation(adress:Adress):Observable<any>{
    let adstr = adress.adress.replace(" " , '+');
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+adstr+'&key=AIzaSyBZJFDnYQk3hD_4UFNaf1MLNAdZ7kJH4vs'
    return this.http.get(`${url}`);
  }

  calcDistance(origin,dest):Observable<any>{
    let url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+origin+";&destinations="+dest+"&key=AIzaSyBZJFDnYQk3hD_4UFNaf1MLNAdZ7kJH4vs";
    return this.http.get(`${url}`);
  }
}
