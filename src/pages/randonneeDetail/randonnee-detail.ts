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
    constructor(public params: NavParams) {
        this.randonnee = this.params.get("randonnee");
    }

    ionViewDidLoad(){
        this.loadMap();
    }

    loadMap(){

        let latLng = new google.maps.LatLng(-34.9290, 138.6010);

        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }
}