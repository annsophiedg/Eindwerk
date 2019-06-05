import { Component, OnInit, ViewChild, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/services/user/user.service';
import { Adress } from 'src/models/adress';
import { MapService } from 'src/services/maps/map.service';
import { ModalController } from '@ionic/angular';
import { MealDetailPage } from '../meals/meal-detail/meal-detail.page';
import { myEnterAnimation } from '../animations/enter';
import { myLeaveAnimation } from '../animations/leave';
import { ChefService } from 'src/services/chef/chef.service';
import { testUserAgent } from '@ionic/core';

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

  @Input()
  set userID(id){
    if(id){
      this._userID = id;
      this.userService.getUserInfo(id).subscribe(res =>{
        this.userAdress = new Adress(res.usr_street, res.usr_housenumber,res.zip_zipcode);
        this.setMarker(this.userAdress, 'home', undefined , null);
      });
    }
  };

  @Input()
  set chefIds(chefIds:string[]){
    this._chefIds = chefIds;
    chefIds.forEach(id => {
        if (id!=this._userID){
          let adress = new Adress(this.meals[id].usr_street, this.meals[id].usr_housenumber,this.meals[id].zip_zipcode);
          this.mealAdresses.push(adress);
          this.setMarker(adress, 'food', this.meals[id], id);
        }
    });
    if(this.userAdress)
      this.calcDistance();
  };
     

      

      // meals.forEach(meal => {
      
      // });

  @ViewChild('mapElement') mapElement;

  constructor(private userService:UserService,
              private mapsService:MapService,
              public modal: ModalController,
              private chefService:ChefService ) {
    this.iconbase = '../../assets/img/';
  }

  ngOnInit() {}

  ngAfterContentInit(): void {
    this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: {lat: 51.0292103, lng: 4.4849014},
          zoom: 15,
          disableDefaultUI: true
        });
    var scope = this;
    google.maps.event.addDomListener(window, 'click', function(){scope.clicked(event)});
  }

  setMarker(adress:Adress, icon_url, meal, chefId){
    var icon = {
      url: this.iconbase + icon_url + '.svg', // url
      scaledSize: new google.maps.Size(50, 50)
    };

    
    var contentString = this.getContentString(meal, chefId);

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    this.infoWindows.push(infowindow);

    this.mapsService.getLocation(adress).subscribe(res =>{
      adress.location = res['results'][0]['geometry']['location'];
      var marker = new google.maps.Marker({position: adress.location, map: this.map, icon:icon});
      marker.addListener('click', function() {
        infowindow.open(this.map, marker);
      });
      
    });
  }


  getContentString(meal, chefId){
    var string = "";
    
    if(meal != undefined){
        string = `<div class="mapsInfo">
        <div class="text"">
          <h2 class="info">` + meal.mls_name + `</h2>
          <h3 class="info">` + meal.mls_description + `</h3>
        </div>
        <fab-button class='button'><ion-icon class="chefId `+ chefId + `" name="arrow-dropright-circle"></ion-icon></fab-button>
        </div>
        `;
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

    const modal = await this.modal.create({
      component: MealDetailPage,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps: {
        'meal': meal,
        'chef': chef
      }
    });
    return await modal.present();
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
