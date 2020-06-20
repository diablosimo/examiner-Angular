import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClassesComponent} from "../classes/classes.component";
import {ProfesseursComponent} from "./professeurs.component";


const routes: Routes = [
  {
    path: '',
    component: ProfesseursComponent,
    data: {
      title: ''
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesseursRoutingModule { }
