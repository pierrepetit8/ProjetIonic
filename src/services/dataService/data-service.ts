import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {stringify} from "@angular/compiler/src/util";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url = "https://geo.data.gouv.fr/api/geogw/file-packages/330f16f0c3db9aeaee868ca26777e20dfa189e65/download?format=GeoJSON&projection=WGS84";

@Injectable()
export class DataService {
    constructor(private http:HttpClient) {

    }

    getRandonnee() {
        let jsonResponse = this.http.get(url);

    }
}