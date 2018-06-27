import {Component, ViewChild, ElementRef} from "@angular/core";
import {Randonnee} from "../../app/randonnee";
import {NavParams, NavController} from "ionic-angular";
import {Geolocation} from '@ionic-native/geolocation';
import {MapService} from '../../services/map-service';
import {TimerService} from '../../services/timer-service'
import { RandonneesList } from "../randonneesList/randonneesList";

declare var google;
@Component({
    selector: "RandonneEnCours",
    templateUrl: 'randonnee-en-cours.html'
})
export class RandonneeEnCours {
    public randonnee: Randonnee;
    public geolocation = new Geolocation();
    public distanceService = new google.maps.DistanceMatrixService();
    public map;
    public restant: string;
    public temps: string;
    @ViewChild('map') mapElement: ElementRef;
    constructor(public params: NavParams, public navCtrl: NavController, public mapService: MapService, public timerService: TimerService) {
        this.randonnee = this.params.get("randonnee");
        this.map = this.params.get("map");
        this.temps = '';
    }
    ngOnInit() {
        let mapToChange = this.mapService.generateMap(this.mapElement, { lat: this.randonnee.depLat, lgn: this.randonnee.depLong }, { lat: this.randonnee.arrLat, lng: this.randonnee.arrLong}, this.randonnee.steps);
        var infoWindow = new google.maps.InfoWindow({map: mapToChange});
        let watch = this.geolocation.watchPosition();
        this.timerService.start();
        watch.subscribe((data) => {
            let position = {
                lat: data.coords.latitude,
                lng: data.coords.longitude
            }
            console.log(position);
            infoWindow.setPosition(position);
            infoWindow.setContent('Votre position');
            this.map.setCenter(position);
            let origin = [];
            let destination = [];
            let resteAParcourir = '';
            let latLngDep = new google.maps.LatLng(position.lat, position.lng);
            let latLngArr = new google.maps.LatLng(this.randonnee.arrLat, this.randonnee.arrLong);
            origin.push(latLngDep);
            destination.push(latLngArr);
            this.distanceService.getDistanceMatrix(
            {
              origins: origin,
              destinations: destination,
              travelMode: 'WALKING',
            }, (response, status) => {
                this.randonnee.restant = response.rows[0].elements[0].distance.text;
            });
        }); 
    }
    stopTimer() {
        this.timerService.stop();
        this.timerService.reset();
        this.navCtrl.push(RandonneesList);
    }
}