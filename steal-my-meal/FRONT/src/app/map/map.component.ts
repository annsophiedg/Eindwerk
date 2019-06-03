import { Component, OnInit, ViewChild, AfterContentInit, Input } from '@angular/core';
import { UserService } from 'src/services/user/user.service';
import { Adress } from 'src/models/adress';
import { MapService } from 'src/services/maps/map.service';

declare var google;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})


export class MapComponent implements OnInit, AfterContentInit {
  private map;
  private markers = [];
  private userAdress:Adress;
  private mealAdresses = [];
  @Input()
  set userID(id){
    if(id){
      this.userService.getUserInfo(id).subscribe(res =>{
        this.userAdress = new Adress(res.usr_street, res.usr_housenumber,res.zip_zipcode);
      });
    }
  };
  @Input()
  set meals(meals){
    if(meals){
      console.log(meals['10205788509268388']);
      
        
        // let adress = new Adress(meal.usr_street, meal.usr_housenumber,meal.zip_zipcode);
        // this.mealAdresses.push(adress);
        // this.setMarker(adress);
     
    }
    }
  @ViewChild('mapElement') mapElement;

  constructor(private userService:UserService,
              private mapsService:MapService) {
    
  }

  ngOnInit() {}

  ngAfterContentInit(): void {
    this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: {lat: 51.0292103, lng: 4.4849014},
          zoom: 16,
          disableDefaultUI: true
        });
  }

  setMarker(adress:Adress){
    this.mapsService.getLocation(adress).subscribe(res =>{
      adress.location = res['results'][0]['geometry']['location'];
      var marker = new google.maps.Marker({position: adress.location, map: this.map});
      this.markers.push(marker);
    });
  }


}
