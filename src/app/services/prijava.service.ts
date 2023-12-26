import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Korisnik } from '../models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class PrijavaService {

  private url = "http://localhost:4000/prijava";

  prijava(korIme: string, pass: string){

    const data={
      korisnickoIme: korIme,
      lozinka: pass
    }
    return this.http.post<Korisnik>(`${this.url}/prijava`, data)
  }

  constructor(private http: HttpClient) { }
}
