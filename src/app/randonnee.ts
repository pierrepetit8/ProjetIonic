export class Randonnee {
    titre: string;
    description: string;
    duree: number;
    denivele: number;
    note: number;
    adresse: string;
    urlImage: string;
    depLat: number;
    depLong: number;
    arrLat: number;
    arrLong: number;
    restant: string;
    steps: [
        {
            lat: number;
            lgn: number;   
        }
    ]
}