import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RandonneesList } from '../pages/randonneesList/randonneesList';
import { RandonneeComponent } from '../pages/randonnee/randonnee.component';
import { RandonneeDetail } from '../pages/randonneeDetail/randonnee-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MapService } from '../services/map-service';
import { RandonneeEnCours } from '../pages/randonneEnCours/randonnee-en-cours';
import { TimerService } from '../services/timer-service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { RestProvider } from '../providers/rest/rest';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RandonneeComponent,
    RandonneeDetail,
    RandonneesList,
    RandonneeEnCours,
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RandonneeComponent,
    RandonneeDetail,
    RandonneesList,
    RandonneeEnCours
  ],
  providers: [
    StatusBar,
    MapService,
    TimerService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
