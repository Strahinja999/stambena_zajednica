import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PrijavaService } from '../services/prijava.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent {

  constructor(private prijavaServis: PrijavaService, private router: Router) { this.greska = ""}

  ngOnInit(): void {
    localStorage.clear()
  }
  

  korIme : string = ""
  pass : string = ""
  greska: string = ""

  prijava(){
    this.prijavaServis.prijava(this.korIme,this.pass).subscribe(
      data=>{
        if(data==null) this.greska = "Nepostojeći korisnik!"
        else {
          this.greska = ""
          localStorage.setItem('ulogovan', data.korisnickoIme)
          if(data.tip == 0) this.router.navigate(['stanar'])
          else if(data.tip == 1) this.router.navigate(['upravnik'])
          else this.greska = "Neodgovarajući tip!"
        }
      }
    )
  }
}
