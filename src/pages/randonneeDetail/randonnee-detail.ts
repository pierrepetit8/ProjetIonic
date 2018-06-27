import {Component, ViewChild, ElementRef} from "@angular/core";
import {Randonnee} from "../../app/randonnee";
import {NavParams, NavController} from "ionic-angular";
import {Geolocation} from '@ionic-native/geolocation';
import {MapService} from '../../services/map-service'
import { RandonneeEnCours } from "../randonneEnCours/randonnee-en-cours";
declare var google;
@Component({
    selector: "RandonneeDetail",
    templateUrl: 'randonnee-detail.html'
})
export class RandonneeDetail {
    public randonnee: Randonnee;
    public directionsService = new google.maps.DirectionsService();
    public map;
    @ViewChild('map') mapElement: ElementRef;
    constructor(public params: NavParams, public navCtrl: NavController, public mapService: MapService) {
        this.randonnee = this.params.get("randonnee");
    }
    
    ionViewDidLoad(){
        this.loadMap();
    }
     
    loadMap(){
        this.map = this.mapService.generateMap(this.mapElement, { lat: this.randonnee.depLat, lgn: this.randonnee.depLong }, { lat: this.randonnee.arrLat, lng: this.randonnee.arrLong}, this.randonnee.steps);
    }

    startRando() {
        this.navCtrl.push(RandonneeEnCours, {randonnee: this.randonnee, map: this.map});
    }
}