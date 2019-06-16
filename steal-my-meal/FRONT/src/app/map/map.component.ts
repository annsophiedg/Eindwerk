import { Component, OnInit, ViewChild, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/services/user/user.service';
import { Adress } from 'src/models/adress';
import { MapService } from 'src/services/maps/map.service';
import { ChefService } from 'src/services/chef/chef.service';
import { ModalService } from 'src/services/modal/modal.service';


declare var google;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})


export class MapComponent implements OnInit, AfterContentInit {
  private map;
  private iconbase;
  private infoWindows = [];
  private userAdress:Adress;
  private mealAdresses = [];
  private _userID = "";
  private _chefIds = [];
  @Output() distanceChange = new EventEmitter();
  public distances = [];
  @Input() private meals;
  @Input() private chefs;
  private markers = {};
  private storedMarkers = [];
  
  @Input() 
  set userID(id){
    if(id){
      this.deleteMarkers();
      this._userID = id;
      this.userService.getUserInfo(id).subscribe(res =>{
        if(res){
          this.userAdress = new Adress(res.usr_street, res.usr_housenumber,res.zip_zipcode);
          if(this.userAdress)
            if(this.userAdress.zip){
              this.setMarker(this.userAdress, 'home', undefined , null);
              this.calcDistance();
            }
        }

      });
    }
  };

  @Input()
  set chefIds(chefIds:string[]){
    this.markers = {};
    this.mealAdresses = [];
    this._chefIds = chefIds;
    
    chefIds.forEach(id => {
      
        if (id!=this._userID){
          let adress = new Adress(this.meals[id].usr_street, this.meals[id].usr_housenumber,this.meals[id].zip_zipcode);          
          
          if(adress)
            if(adress.zip){
              
              this.mealAdresses.push(adress);
              if(!this.markers[adress.adress]){
                this.markers[adress.adress] = {'meals' : [], 'ids' : []};
              }
              this.markers[adress.adress]['meals'].push(this.meals[id]);
              this.markers[adress.adress]['ids'].push(id);
            }
        }
    });

    this.mealAdresses.forEach(a => {
        this.setMarker(a, 'food', this.markers[a.adress]['meals'], this.markers[a.adress]['ids']);
    });

    this.userID = this._userID;
  };

  @ViewChild('mapElement') mapElement;

  constructor(private userService:UserService,
              private mapsService:MapService,
              public ms: ModalService,
              private chefService:ChefService ) {
    this.iconbase = '../../assets/img/';
  }

  ngOnInit() {}

  ngAfterContentInit(): void {
    this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: {lat:0,lng:0},
          zoom: 15,
          disableDefaultUI: true,
          styles:this.getStyle(),
        });
    var scope = this;
    google.maps.event.addDomListener(window, 'click', function(){scope.clicked(event)});
  }

  setMarker(adress:Adress, icon_url, meals, chefIds){
    var icon = {
      url: this.iconbase + icon_url + '.svg', // url
      scaledSize: new google.maps.Size(50, 50)
    };

    // console.log('CHEFS = ' + chefIds)
    var contentString = this.getContentString(meals, chefIds);

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    this.infoWindows.push(infowindow);

    // console.log(adress);
    this.mapsService.getLocation(adress).subscribe(res =>{
      adress.location = res['results'][0]['geometry']['location'];
      if(!meals)
        this.map.setCenter(adress.location);
      var marker = new google.maps.Marker({position: adress.location, map: this.map, icon:icon});
      marker.addListener('click', function() {
        infowindow.open(this.map, marker);
      });
      this.storedMarkers.push(marker);
    });
  }

  deleteMarkers(){
    this.storedMarkers.forEach(marker => {
      marker.setMap(null);
    });
    this.storedMarkers = [];
  }

  getContentString(meals, chefIds){
    var string = "";
    
    if(meals != undefined){
      for(var x=0;x<chefIds.length;x++){
        string += `<div class="mapsInfo">
        <div class="text"">
          <h2 class="info">` + meals[x].mls_name + `</h2>
          <h3 class="info">` + meals[x].mls_description + `</h3>
        </div>
        <fab-button class='button'><ion-icon class="chefId `+ chefIds[x] + `" name="arrow-dropright-circle"></ion-icon></fab-button>
        </div>
        `;
      };
    }
    else
      string = "You are here";

    return string;
  }
  
  public clicked(event){
    if(event.target.className.includes('chefId')){
      var id = event.target.className.match(new RegExp('chefId' + '\\s(\\w+)'))[1]
      this.goToMealDetail(id);

      this.infoWindows.forEach(window => {
        window.close();
      });
    }
  }

  async goToMealDetail(chefId){
    var meal = this.meals[chefId];
    var chef = this.chefs[this._chefIds.indexOf(chefId)];

    this.ms.mealDetailModal(meal,chef);
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
        if(el.distance)
          dist.push(el.distance.text);
      });
      this.distances = dist;
      this.distanceChange.emit(this.distances);
  }
  }


  getStyle(){
    return [
      {
          "featureType": "administrative",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "hue": "#FFBB00"
              },
              {
                  "saturation": 43.400000000000006
              },
              {
                  "lightness": 37.599999999999994
              },
              {
                  "gamma": 1
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "hue": "#00FF6A"
              },
              {
                  "saturation": -1.0989010989011234
              },
              {
                  "lightness": 11.200000000000017
              },
              {
                  "gamma": 1
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "hue": "#FFC200"
              },
              {
                  "saturation": -61.8
              },
              {
                  "lightness": 45.599999999999994
              },
              {
                  "gamma": 1
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "all",
          "stylers": [
              {
                  "hue": "#FF0300"
              },
              {
                  "saturation": -100
              },
              {
                  "lightness": 51.19999999999999
              },
              {
                  "gamma": 1
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "all",
          "stylers": [
              {
                  "hue": "#FF0300"
              },
              {
                  "saturation": -100
              },
              {
                  "lightness": 52
              },
              {
                  "gamma": 1
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "hue": "#0078FF"
              },
              {
                  "saturation": -13.200000000000003
              },
              {
                  "lightness": 2.4000000000000057
              },
              {
                  "gamma": 1
              }
          ]
      }
  ];
  }

}
