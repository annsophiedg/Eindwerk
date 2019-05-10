import { Component, OnInit } from "@angular/core";
import { DataService, IDataItem } from "../shared/data.service";
import { TnsOAuthClient, ITnsOAuthTokenResult } from "nativescript-oauth2";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    items: Array<IDataItem>;
    client = new TnsOAuthClient('facebook');
    constructor(private _itemService: DataService) { }

    ngOnInit(): void {
        this.items = this._itemService.getItems();
        console.log("loaded");
    }

    clicked(e){
        console.log("clicked");
        this.client.loginWithCompletion((tokenResult: ITnsOAuthTokenResult, error) => {
            if (error) {
                console.error("back to main page with error: ");
                console.error(error);
            } else {
                console.log("back to main page with access token: ");
                console.log(tokenResult);
            }
        });
    }

    
 
    
}
