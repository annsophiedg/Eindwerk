import { Component } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage,
    private router: Router
  ) {
    this.platform.ready().then(() => {
        // Here we will check if the user is already logged in
        // because we don't want to ask users to log in each time they open the app
        console.log("checking fb");
        this.nativeStorage.getItem('facebook_user')
        .then( data => {
          // user is previously logged and we have his data
          // we will let him access the app
          console.log('logged-in');
          this.router.navigate(["/user"]);
          this.splashScreen.hide();
        }, err => {
          //we don't have the user data so we will ask him to log in
          console.log('log-in');
          this.router.navigate(["/login"]);
          this.splashScreen.hide();
        });
  
        this.statusBar.styleDefault();
      });
    }
}
