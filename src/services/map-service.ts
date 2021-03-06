import { Injectable, ElementRef } from '@angular/core';
import { Randonnee } from '../app/randonnee';

declare var google;
@Injectable()
export class MapService {
    public directionsService = new google.maps.DirectionsService();
    public distanceService = new google.maps.DistanceMatrixService();
    public distance = 'salut';
    constructor() { 
       
    }
    generateMap(mapToBind: ElementRef, depart: any, arrive: any, steps: any) {
        let stepsMap = [];

        stepsMap.push({
            location: new google.maps.LatLng(steps.lat, steps.lgn),
            stopover: true
        });
        console.log(steps);
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
            travelMode: 'WALKING',
            waypoints: stepsMap
        }
        this.directionsService.route(optionsTravel, function(response, status) {
            if (status == 'OK') {
              directionsDisplay.setDirections(response);
            }
        });
        return map;
    }

    getDistanceToFinish(position: any, randonnee: Randonnee) {
        let origin = [];
        let destination = [];
        origin.push(new google.maps.LatLng(position.latitude, position.longitude));
        destination.push(new google.maps.LatLng(randonnee.arrLat, randonnee.arrLong));
        return this.distanceService.getDistanceMatrix(
            {
              origins: origin,
              destinations: destination,
              travelMode: 'WALKING',
            }, function(response, status) {
                return response.rows[0].elements[0].distance.text;
            });
    } 
    callback(response, status) {
        return response.rows[0].elements[0].distance.text;
    }

}