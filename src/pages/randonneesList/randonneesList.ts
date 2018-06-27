/**
 * Created by pipetit1 on 14/05/18.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RandonneeComponent } from '../randonnee/randonnee.component';
import { Randonnee } from '../../app/randonnee';
import {RandonneeDetail} from "../randonneeDetail/randonnee-detail";
import {RestProvider} from "../../providers/rest/rest";

@Component({
    selector: 'page-randonnee',
    templateUrl: 'randonneesList.html'
})
export class RandonneesList {
    selectedItem: any;
    randoList: Array<Randonnee>;

    constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
        this.selectedItem = navParams.get('randonnee');

        this.randoList = [];

        restProvider.getData().then(data => {
            this.randoList = restProvider.transformData(data);
            console.log(this.randoList[0]);
        }).catch(err => {console.log(err)});
    }

    clickDetails(randonnee) {
        this.navCtrl.push(RandonneeDetail, {randonnee: randonnee});
    }
}