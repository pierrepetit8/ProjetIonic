import {Component, ViewChild, ElementRef} from "@angular/core";
import {Randonnee} from "../../app/randonnee";
import {NavParams} from "ionic-angular";
import {Geolocation} from '@ionic-native/geolocation';
import {MapService} from '../../services/map-service'

declare var google;
@Component({
    selector: "RandonneEnCOurs",
    templateUrl: 'randonnee-en-cours.html'
})
export class RandonneeEnCours {
    public randonnee: Randonnee;
    public geolocation = new Geolocation();
    public map;
    @ViewChild('map') mapElement: ElementRef;
    constructor(public params: NavParams, public mapService: MapService) {
        this.randonnee = this.params.get("randonnee");
        this.map = this.params.get("map");
    }
    onInit() {
        var infoWindow = new google.maps.InfoWindow({map: this.map});
        let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
            let position = {
                lat: data.coords.latitude,
                lng: data.coords.longitude
            }
            infoWindow.setPosition(position);
            infoWindow.setContent('Votre position');
            this.map.setCenter(position);
        });
    }
}