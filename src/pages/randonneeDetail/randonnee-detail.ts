import {Component, Input, ViewChild, ElementRef} from "@angular/core";
import {Randonnee} from "../../app/randonnee";
import {NavParams} from "ionic-angular";

declare var google;
@Component({
    selector: "RandonneeDetail",
    templateUrl: 'randonnee-detail.html'
})
export class RandonneeDetail {
    public randonnee: Randonnee;
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    public directionsService = new google.maps.DirectionsService();

    constructor(public params: NavParams) {
        this.randonnee = this.params.get("randonnee");
    }
    
    ionViewDidLoad(){
        this.loadMap();
      }
     
    loadMap(){
        let latLngDep = new google.maps.LatLng(this.randonnee.depLat, this.randonnee.depLong);
        let latLngArr = new google.maps.LatLng(this.randonnee.arrLat, this.randonnee.arrLong);
        let directionsDisplay = new google.maps.DirectionsRenderer();
        let mapOptions = {
            center: latLngDep,
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        directionsDisplay.setMap(this.map);

        let optionsTravel = {
            origin: latLngDep,
            destination: latLngArr,
            travelMode: 'WALKING'
        }
        this.directionsService.route(optionsTravel, function(response, status) {
            if (status == 'OK') {
              directionsDisplay.setDirections(response);
            }
          });
    }
}