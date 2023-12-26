import { Component } from '@angular/core';
import { Trosak } from '../models/trosak';
import { TrosakService } from '../services/trosak.service';
import { Uplata } from '../models/uplata';
import { UplataService } from '../services/uplata.service';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';

interface Mesec {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-upravnik',
  templateUrl: './upravnik.component.html',
  styleUrls: ['./upravnik.component.css']
})
export class UpravnikComponent {
  constructor(private router: Router, private trosakServis: TrosakService, private uplataServis: UplataService, private korisnikServis: KorisnikService) {}

  ngOnInit(): void {
    this.trenutniKontekst = 'pocetna'
    if(localStorage.getItem('ulogovan') != 'milos123' || localStorage.getItem('ulogovan') == null){
      this.router.navigate([''])
    } else{
      let ulogovan = localStorage.getItem("ulogovan");
      ulogovan = ulogovan == null ? "" : ulogovan;
      this.korisnikServis.dohvatiKorisnika(ulogovan).subscribe((k: Korisnik) =>{
        
        this.upravnik = k
      })
      this.trosakServis.dohvatiSveTroskove().subscribe((troskovi: Trosak[]) => {
        this.troskovi = troskovi;
      })
      this.uplataServis.dohvatiSveUplate().subscribe((uplate: Uplata[]) => {
        this.uplate = uplate;
      })
      this.uplataServis.dohvatiSveUplateStana(8).subscribe((u: Uplata[]) => {
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
    }

  }

  upravnik: Korisnik = new Korisnik;
  
  trenutniKontekst:string = 'pocetna';
  selektovanMesec:string = ''

  troskovi: Trosak[] = new Array;
  uplate: Uplata[] = new Array

  uplateStana: Uplata[] = new Array

  uplateStana1: Uplata[] = new Array

  meseci: string[] = ["JANUAR", "FEBRUAR", "MART", "APRIL", "MAJ", "JUN", "JUL", "AVGUST", "SEPTEMBAR", "OKTOBAR", "NOVEMBAR", "DECEMBAR"]

  stanovi:string[] = ["Stan 1", "Stan 2", "Stan 3", "Stan 4", "Stan 5", "Stan 6", "Stan 7", "Stan 8"]
  stan: string =""

  //podaci za UPLATU
  mesecU: number = 0;
  iznosU: number = 0;
  datumU: Date = new Date()
  stanU: number = 0;
  placanjeU: number = 2;

  //podaci za TROSAK
  iznosT: number = 0;
  datumT: Date = new Date();
  opisT: string = ""

  greska:string = ""
  greska1:string = ""

  promeniKontekst(kontekst:string){
    this.trenutniKontekst = kontekst;
  }

  dodajUplatu(){
    if(this.mesecU == 0 || this.iznosU == 0 || this.stanU == 0 || this.placanjeU == 2){
      this.greska = "Svi podaci moraju biti uneti!" 
    }else{
      this.greska = ""
      this.uplataServis.dodajUplatu(this.uplate[this.uplate.length-1].id + 1, this.iznosU, this.datumU, this.mesecU, this.stanU, this.placanjeU).subscribe(m => {
         if (m == null) { alert("Greska") }
         else {
           this.ngOnInit();
           location.reload();
         }
       })
    }
  }

  dodajTrosak(){
    if(this.iznosT == 0 || this.opisT == ""){
      this.greska1 = "Svi podaci moraju biti uneti!" 
    }else{
      this.greska1 = ""
      this.trosakServis.dodajTrosak(this.troskovi[this.troskovi.length-1].id+1, this.iznosT, this.datumT,this.opisT).subscribe(m => {
        if (m == null) { alert("Greska") }
        else {
          this.ngOnInit();
          location.reload();
        }
      })
    }
  }  

  obrisiT(id: number){
    this.trosakServis.obrisiTrosak(id).subscribe((msg: any) => {
      if(msg['msg'] != "ok") alert("GRESKA!")
      else{
        this.ngOnInit();
        location.reload();
      }
    })
  }

  obrisiU(id:number){
    this.uplataServis.obrisiUplatu(id).subscribe((msg: any) => {
      if(msg['msg'] != "ok") alert("GRESKA!")
      else{
        this.ngOnInit();
        location.reload();
      }
    })
  }

  uplateStanara(brStana: number){
    this.stan = this.stanovi[brStana-1]
    this.uplataServis.dohvatiSveUplateStana(brStana).subscribe((u: Uplata[]) => {
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
      this.uplateStana1 = novNiz;
    })
  }
}
