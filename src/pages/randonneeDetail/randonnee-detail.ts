import {Component, Input, ViewChild, ElementRef} from "@angular/core";
import {Randonnee} from "../../app/randonnee";
import {NavParams} from "ionic-angular";


@Component({
    selector: "RandonneeDetail",
    templateUrl: 'randonnee-detail.html'
})
export class RandonneeDetail {
    public randonnee: Randonnee;

    constructor(public params: NavParams) {
        this.randonnee = this.params.get("randonnee");
    }
}