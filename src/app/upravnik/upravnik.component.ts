import { Component } from '@angular/core';

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
  ngOnInit(): void {
    this.trenutniKontekst = 'pocetna'
  }
  
  trenutniKontekst:string = 'pocetna';
  selektovanMesec:string = ''

  promeniKontekst(kontekst:string){
    this.trenutniKontekst = kontekst;
  }

  meseci: Mesec[] = [
    {value: '1', viewValue: 'Januar'},
    {value: '2', viewValue: 'Februar'},
    {value: '3', viewValue: 'Mart'},
    {value: '4', viewValue: 'April'},
    {value: '5', viewValue: 'Maj'},
    {value: '6', viewValue: 'Jun'},
    {value: '7', viewValue: 'Jul'},
    {value: '8', viewValue: 'Avgust'},
    {value: '9', viewValue: 'Septembar'},
    {value: '10', viewValue: 'Oktobar'},
    {value: '11', viewValue: 'Novembar'},
    {value: '12', viewValue: 'Decembar'},
  ];
}
