import { Component } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage {

  // FB_APP_ID: number = 281257842778510;

	constructor(
		private fb: Facebook,
		private nativeStorage: NativeStorage,
		public loadingController: LoadingController,
		private router: Router,
	) {

	}

	// async doFbLogin(){
  //   console.log('logging in');
	// 	const loading = await this.loadingController.create({
	// 		message: 'Please wait...'
	// 	});
	// 	this.presentLoading(loading);

	// 	//the permissions your facebook app needs from the user
  //   const permissions = ["public_profile", "email"];

	// 	this.fb.login(permissions)
	// 	.then(response =>{
	// 		let userId = response.authResponse.userID;

	// 		//Getting name and gender properties
	// 		this.fb.api("/me?fields=name,email", permissions)
	// 		.then(user =>{
	// 			user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
	// 			//now we have the users info, let's save it in the NativeStorage
	// 			this.nativeStorage.setItem('facebook_user',
	// 			{
	// 				name: user.name,
	// 				email: user.email,
	// 				picture: user.picture
	// 			})
	// 			.then(() =>{
	// 				this.router.navigate(["/user"]);
	// 				loading.dismiss();
	// 			}, error =>{
	// 				console.log(error);
	// 				loading.dismiss();
	// 			})
	// 		})
	// 	}, error =>{
	// 		console.log(error);
	// 		loading.dismiss();
	// 	});
	// }

	// async presentLoading(loading) {
	// 	return await loading.present();
  // }
  
  checkLoginState() {
    this.fb.getLoginStatus();
    
  }

}
