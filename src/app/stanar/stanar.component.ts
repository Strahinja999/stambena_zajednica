import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { Router } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';

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
  ngOnInit(): void {
    this.trenutniKontekst = 'pocetna'
  }
  
  trenutniKontekst:string = 'pocetna';

  promeniKontekst(kontekst:string){
    this.trenutniKontekst = kontekst;
  }
}
