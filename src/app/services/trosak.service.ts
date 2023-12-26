import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trosak } from '../models/trosak';

@Injectable({
  providedIn: 'root'
})
export class TrosakService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:4000/trosak";

  dohvatiSveTroskove(){
    return this.http.get<Trosak[]>(`${this.url}/dohvatiSveTroskove`)
  }

  dodajTrosak(id: number,i: number, d: Date, o: string){
    const data = {
      id: id,
      iznos: i,
      datum: d,
      opis: o
    }
    return this.http.post(`${this.url}/dodajTrosak`, data)
  }

  obrisiTrosak(id: number){
    const data = {
      id: id
    }
    return this.http.post(`${this.url}/obrisiTrosak`,  data)
  }
}
