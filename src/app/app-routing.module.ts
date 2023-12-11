import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrijavaComponent } from './prijava/prijava.component';
import { UpravnikComponent } from './upravnik/upravnik.component';
import { StanarComponent } from './stanar/stanar.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';

const routes: Routes = [
  {path: '', component: PrijavaComponent},
  {path: 'upravnik', component: UpravnikComponent},
  {path: 'stanar', component: StanarComponent},
  {path: 'promenaLozinke', component: PromenaLozinkeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
