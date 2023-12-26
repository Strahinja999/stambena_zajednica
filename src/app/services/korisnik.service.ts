import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:4000/korisnik";

  dohvatiKorisnika(korIme: string){
    const data = { 
      korisnickoIme: korIme
    }

    return this.http.post<Korisnik>(`${this.url}/dohvatiKor`, data)

  }

  promeniLozinku(korIme: string, lozinka: string){
    const data = {
      korisnickoIme: korIme,
      lozinka: lozinka
    }
    return this.http.post(`${this.url}/promeniLoz`, data)
  }

}
