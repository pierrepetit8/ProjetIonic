import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RXJS} from "@ionic/app-scripts";
import {Observable} from "rxjs/Observable";
import {Randonnee} from "../../app/randonnee";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
    url = "https://geo.data.gouv.fr/api/geogw/file-packages/330f16f0c3db9aeaee868ca26777e20dfa189e65/download?format=GeoJSON&projection=WGS84";

    constructor(public http: HttpClient) {
    }

    getData() {
        let promise = new Promise((resolve, reject) => {
            this.http.get(this.url).subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            })
        });
        return promise;
    }

    transformData(data) { // comme la randonnée est une boucle nous avons pris la moitié du chemin comme l'arrivée et le quart comme une étape 
        let randonnees = [];
        data.features.map(r => {
            let randonnee = new Randonnee();
            randonnee.titre = r.properties.NOM_BOUCLE;
            randonnee.adresse = r.properties.ZONE_GEO;
            randonnee.depLat = r.geometry.coordinates[0][1];
            randonnee.depLong = r.geometry.coordinates[0][0];
            randonnee.arrLat = r.geometry.coordinates[Math.ceil((r.geometry.coordinates.length-1)/2)][1];
            randonnee.arrLong = r.geometry.coordinates[Math.ceil((r.geometry.coordinates.length-1)/2)][0];
            randonnee.steps = {
                lat: r.geometry.coordinates[Math.ceil((r.geometry.coordinates.length-1)/4)][1],
                lgn: r.geometry.coordinates[Math.ceil((r.geometry.coordinates.length-1)/4)][0],
            };
            randonnee.denivele = 0;
            randonnee.duree = 0;
            randonnee.description = "Description non renseignée";
            randonnee.note = Math.floor(Math.random() * 5) + 1;
            randonnees.push(randonnee);
        });
        return randonnees;
    }
}
