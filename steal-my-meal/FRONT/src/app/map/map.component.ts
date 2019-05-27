import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';

declare var google;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})


export class MapComponent implements OnInit, AfterContentInit {
  private map;
  @ViewChild('mapElement') mapElement;
  constructor() { }

  ngOnInit() {}

  ngAfterContentInit(): void {
    this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: {lat: -34.1, lng: 150.644},
          zoom: 12,
          disableDefaultUI: true
        });
    var marker = new google.maps.Marker({position: {lat: -34.1, lng: 150.644}, map: this.map});
  }


}
