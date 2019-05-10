// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app/app.module";


platformNativeScriptDynamic({ createFrameOnBootstrap: true }).bootstrapModule(
    AppModule
  );

// platformNativeScriptDynamic().bootstrapModule(AppModule);

import { configureTnsOAuth } from "nativescript-oauth2";
 
import {
  TnsOaProvider,
  TnsOaProviderOptionsFacebook,
  TnsOaProviderFacebook
} from "nativescript-oauth2/providers";
 
function configureOAuthProviderFacebook(): TnsOaProvider {
  const facebookProviderOptions: TnsOaProviderOptionsFacebook = {
    openIdSupport: "oid-none",
    clientId: "281257842778510",
    clientSecret: "1067161d2ef86e5482d6a4766c3ba15d",
    redirectUri: "https://www.facebook.com/connect/login_success.html",
    scopes: ["email"]
  };
  const facebookProvider = new TnsOaProviderFacebook(facebookProviderOptions);
  return facebookProvider;
}
 
configureTnsOAuth([
  configureOAuthProviderFacebook()
]);



