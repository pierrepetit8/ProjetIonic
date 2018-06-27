import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DataService} from "../../services/dataService/data-service";
import {RestProvider} from "../../providers/rest/rest";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  randonnees: any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
      /*restProvider.getData().then(data => {
          restProvider.transformData(data);
      });*/
  }
}
