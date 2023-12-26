import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent {

  constructor(private ruter: Router, private korisnikServis: KorisnikService) {
    this.korIme = new String(localStorage.getItem("ulogovan"))
    
    this.korisnikServis.dohvatiKorisnika(this.korIme.toString()).subscribe(
      data => {
        if(data == null) alert("GRESKA!")
        else{
          this.korisnik = data
        }
      }
    )
  }

  staraLoz: string = ""
  novaLoz: string = ""
  loz: string = ""
  greska: string = ""
  korisnik: Korisnik = new Korisnik()
  korIme: String = new String()

  odjava(){
    localStorage.clear()
    this.ruter.navigate([""])
  }

  promeni(){
  
    if(this.korisnik.lozinka != this.staraLoz) {
      this.greska = "Netačna lozinka"
    }else{
      if(this.novaLoz != this.loz){
        this.greska = "Potvrda lozinke nije dobra!"
      }else{
        this.greska =""
        //promena lozinke u bazi
        this.korisnikServis.promeniLozinku(this.korisnik.korisnickoIme,this.novaLoz).subscribe(
          data=>{
            if(data==null) alert("Nema korisnika")
            else {
              alert("OK")
            }
          }
        )

      }
      
    }
  }

}
