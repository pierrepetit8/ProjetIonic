import { Injectable, ElementRef } from '@angular/core';
import { Randonnee } from '../app/randonnee';

declare var google;
@Injectable()
export class MapService {
    public directionsService = new google.maps.DirectionsService();
    constructor() { 
       
    }
    generateMap(mapToBind: ElementRef, depart: any, arrive: any) {
        let latLngDep = new google.maps.LatLng(depart.lat, depart.lgn);
        let latLngArr = new google.maps.LatLng(arrive.lat, arrive.lng);
        let mapOptions = {
            center: latLngDep,
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        }
        let map = new google.maps.Map(mapToBind.nativeElement, mapOptions);
        let directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
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
        return map;
    }

    bindMap(mapToBind: ElementRef, randonne: Randonnee) {
        
    }

}