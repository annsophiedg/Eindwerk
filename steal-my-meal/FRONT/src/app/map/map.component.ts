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
  private iconbase;
  private markers = [];
  private userAdress:Adress;
  private mealAdresses = [];
  @Input() private meals;

  @Input()
  set userID(id){
    if(id){
      this.userService.getUserInfo(id).subscribe(res =>{
        this.userAdress = new Adress(res.usr_street, res.usr_housenumber,res.zip_zipcode);
        this.setMarker(this.userAdress, 'home');
      });
    }
  };

  @Input()
  set chefIds(chefIds:string[]){
    chefIds.forEach(id => {
        let adress = new Adress(this.meals[id].usr_street, this.meals[id].usr_housenumber,this.meals[id].zip_zipcode);
        this.mealAdresses.push(adress);
        this.setMarker(adress, 'food');
    });
  };
     

      

      // meals.forEach(meal => {
      
      // });

  @ViewChild('mapElement') mapElement;

  constructor(private userService:UserService,
              private mapsService:MapService) {
    this.iconbase = '../../assets/img/';
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

  setMarker(adress:Adress, icon_url){
    var icon = {
      url: this.iconbase + icon_url + '.svg', // url
      scaledSize: new google.maps.Size(50, 50)
    };
    this.mapsService.getLocation(adress).subscribe(res =>{
      adress.location = res['results'][0]['geometry']['location'];
      var marker = new google.maps.Marker({position: adress.location, map: this.map, icon:icon, });
      this.markers.push(marker);
    });
  }


}
