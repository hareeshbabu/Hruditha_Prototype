import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutusPage } from '../pages/aboutus/aboutus'
import { ContactUsPage } from '../pages/contact-us/contact-us'
import { ShopinfoPage } from '../pages/shopinfo/shopinfo'
import { AgmCoreModule } from 'angular2-google-maps/core';
import { SearchfilterPage } from '../pages/searchfilter/searchfilter';
import { ShopslistPage } from '../pages/shopslist/shopslist';
import { CustomersProvider } from '../providers/customers/customers';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { GoogleMapsClusterProvider } from '../providers/google-maps-cluster/google-maps-cluster';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutusPage,
    ShopinfoPage,
    SearchfilterPage,
    ShopslistPage,
    ContactUsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAevmVUj5U9-ZwVxA1p5vOPOhKMOKvZb_k',
      libraries: ["places"]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutusPage,
    ShopinfoPage,
    SearchfilterPage,
    ShopslistPage,
    ContactUsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CustomersProvider
  ]
})
export class AppModule {}
