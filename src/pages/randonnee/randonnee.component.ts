/**
 * Created by pipetit1 on 14/05/18.
 */
import {Component, Input} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Randonnee } from '../../app/randonnee';
import {RandonneeDetail} from "../randonneeDetail/randonnee-detail";

@Component({
    selector: "randonnee-component",
    templateUrl: 'randonnee.component.html'
})
export class RandonneeComponent {
    @Input() randonnee : Randonnee;
    public pushPage: any;
    public params: any;

    constructor() {
        this.pushPage = RandonneeDetail;
        this.params = Randonnee;
    }
}
