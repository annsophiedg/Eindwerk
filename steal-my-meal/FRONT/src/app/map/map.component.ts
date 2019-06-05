import { Component, OnInit, ViewChild, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
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
  private _userID = "";
  @Output() distanceChange = new EventEmitter();
  public distances = [];
  @Input() private meals;

  @Input()
  set userID(id){
    if(id){
      this._userID = id;
      this.userService.getUserInfo(id).subscribe(res =>{
        this.userAdress = new Adress(res.usr_street, res.usr_housenumber,res.zip_zipcode);
        this.setMarker(this.userAdress, 'home');
      });
    }
  };

  @Input()
  set chefIds(chefIds:string[]){
    chefIds.forEach(id => {
        if (id!=this._userID){
          let adress = new Adress(this.meals[id].usr_street, this.meals[id].usr_housenumber,this.meals[id].zip_zipcode);
          this.mealAdresses.push(adress);
          this.setMarker(adress, 'food');
        }
    });
    if(this.userAdress)
      this.calcDistance();
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

  calcDistance(){
    let origin =  this.userAdress.adress.replace(/ /g, "+");
    let dest = [];
    this.mealAdresses.forEach(a => {
      dest.push(a.adress);
    }); 
    
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: dest,
        travelMode: 'WALKING'
      }, this.callback);
    
  }

  callback = (response, status) => {
    if(status == 'OK'){
      let dist = [];
      response.rows[0].elements.forEach(el => {
        dist.push(el.distance.text);
      });
      this.distances = dist;
      this.distanceChange.emit(this.distances);
  }
  }


}
