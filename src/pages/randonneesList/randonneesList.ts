/**
 * Created by pipetit1 on 14/05/18.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RandonneeComponent } from '../randonnee/randonnee.component';
import { Randonnee } from '../../app/randonnee';
import {RandonneeDetail} from "../randonneeDetail/randonnee-detail";

@Component({
    selector: 'page-randonnee',
    templateUrl: 'randonneesList.html'
})
export class RandonneesList {
    selectedItem: any;
    randoList: Array<Randonnee>;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.selectedItem = navParams.get('randonnee');

        this.randoList = [];
        this.randoList.push({
            titre : 'Label ranbdonnée1',
            description : "Ceci est la description",
            duree : 1.30,
            denivele : 10,
            note : 5,
            adresse : "Adresse, Ici",
            urlImage : "",
            depLat: 47.069365,
            depLong: 2.385255
        },
        {
            titre : 'Label ranbdonnée2',
            description : "Ceci est la description",
            duree : 1.30,
            denivele : 10,
            note : 5,
            adresse : "Adresse, Ici",
            urlImage : "",
            depLat: 47.069365,
            depLong: 2.385255
        });
    }

    clickDetails(randonnee) {
        this.navCtrl.push(RandonneeDetail, {randonnee: randonnee});
    }
}