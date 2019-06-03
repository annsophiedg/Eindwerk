import { concat } from 'rxjs';

export class Adress
{
    street:string;
    nmbr:number;
    zip:number;
    adress:string;
    location;

    constructor(street:string,nmbr:number,zip:number){
        this.adress = street + " " + nmbr + " " + zip;
        this.street = street;
        this.nmbr = nmbr;
        this.zip = zip;
    }
}