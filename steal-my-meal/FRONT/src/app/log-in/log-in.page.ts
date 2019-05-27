import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  constructor() { }

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    clickable: false,
    type: 'progressbar'
  };

  ngOnInit() {
  }

}
