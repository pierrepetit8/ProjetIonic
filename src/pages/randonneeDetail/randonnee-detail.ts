import {Component, ViewChild, ElementRef} from "@angular/core";
import {Randonnee} from "../../app/randonnee";
import {NavParams} from "ionic-angular";
import {Geolocation} from '@ionic-native/geolocation';

declare var google;
@Component({
    selector: "RandonneeDetail",
    templateUrl: 'randonnee-detail.html'
})
export class RandonneeDetail {
    public randonnee: Randonnee;
    public geolocation = new Geolocation();
    public directionsService = new google.maps.DirectionsService();
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    constructor(public params: NavParams) {
        this.randonnee = this.params.get("randonnee");
    }
    
    ionViewDidLoad(){
        this.loadMap();
    }
     
    loadMap(){
        let steps = [];
        steps.push({
            location: new google.maps.LatLng(48.856741, 2.312720),
            stopover: true
        });
        let latLngDep = new google.maps.LatLng(this.randonnee.depLat, this.randonnee.depLong);
        let latLngArr = new google.maps.LatLng(this.randonnee.arrLat, this.randonnee.arrLong);
        let directionsDisplay = new google.maps.DirectionsRenderer();
        let mapOptions = {
            center: latLngDep,
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        directionsDisplay.setMap(this.map);

        let optionsTravel = {
            origin: latLngDep,
            destination: latLngArr,
            travelMode: 'WALKING',
            waypoints: steps
        }
        this.directionsService.route(optionsTravel, function(response, status) {
            if (status == 'OK') {
              directionsDisplay.setDirections(response);
            }
        });
    }

    startRando() {
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