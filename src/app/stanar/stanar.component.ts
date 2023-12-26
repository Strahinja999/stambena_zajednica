import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { Router } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { Korisnik } from '../models/korisnik';
import { TrosakService } from '../services/trosak.service';
import { UplataService } from '../services/uplata.service';
import { KorisnikService } from '../services/korisnik.service';
import { Trosak } from '../models/trosak';
import { Uplata } from '../models/uplata';

export interface PeriodicElement {
}

const ELEMENT_DATA: PeriodicElement[] = [
];

@Component({
  selector: 'app-stanar',
  templateUrl: './stanar.component.html',
  styleUrls: ['./stanar.component.css'],
})
export class StanarComponent {

  constructor(private router: Router, private trosakServis: TrosakService, private uplataServis: UplataService, private korisnikServis: KorisnikService){}

  ngOnInit(): void {
    this.trenutniKontekst = 'pocetna'
    let ulogovan = localStorage.getItem("ulogovan");
    ulogovan = ulogovan == null ? "" : ulogovan;
    if(localStorage.getItem('ulogovan') != ulogovan || localStorage.getItem('ulogovan') == null){
      this.router.navigate([''])
    }else{
      this.korisnikServis.dohvatiKorisnika(ulogovan).subscribe((k: Korisnik) =>{
        this.korisnik = k
        this.uplataServis.dohvatiSveUplateStana(k.brojStana).subscribe((u: Uplata[]) => {
          u.sort(function(a, b){
            return a.mesec - b.mesec
          })
          // [] [] [] [] [] [] [] [] [] [] [] []
          let novNiz: Uplata[] = new Array(12)
          for (let i = 0; i < u.length; i++){
            novNiz[u[i].mesec-1] = u[i]
          }
          for(let i = 0; i < novNiz.length; i++){
            if(novNiz[i] == undefined) novNiz[i] = new Uplata()
          }
          this.uplateStana = novNiz;
        })
      })
      this.trosakServis.dohvatiSveTroskove().subscribe((troskovi: Trosak[]) => {
        this.troskovi = troskovi;
        for(let i = 0; i< troskovi.length; i++){
          this.trenStanje -= troskovi[i].iznos
        }
      })
      this.uplataServis.dohvatiSveUplate().subscribe((uplate: Uplata[]) => {
        for(let i = 0; i < uplate.length; i++){
          this.trenStanje += uplate[i].iznos
        }
      })
      
    }
  }
  
  trenutniKontekst:string = 'pocetna';

  korisnik: Korisnik = new Korisnik

  troskovi: Trosak[] = new Array

  uplateStana:Uplata[] = new Array

  trenStanje:number = 0

  promeniKontekst(kontekst:string){
    this.trenutniKontekst = kontekst;
  }
}
