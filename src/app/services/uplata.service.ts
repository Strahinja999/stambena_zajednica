import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Uplata } from '../models/uplata';

@Injectable({
  providedIn: 'root'
})
export class UplataService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:4000/uplata";

  dohvatiSveUplate(){
    return this.http.get<Uplata[]>(`${this.url}/dohvatiSveUplate`)
  }

  dohvatiSveUplateStana(brStana: number){
    const data = {brStana: brStana}
    return this.http.post<Uplata[]>(`${this.url}/dohvatiSveUplateStana`, data)
  }

  dodajUplatu(id: number, i:number, d: Date, m: number, s:number, t:number){
    const data = {
      id: id,
      iznos: i,
      datum: d,
      mesec: m,
      brojStana: s,
      tip: t
    }
    return this.http.post(`${this.url}/dodajUplatu`, data)
  }

  obrisiUplatu(id: number){
    const data = {
      id: id
    }
    return this.http.post(`${this.url}/obrisiUplatu`, data) 
  }
}
