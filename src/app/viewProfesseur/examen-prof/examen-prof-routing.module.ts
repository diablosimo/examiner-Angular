import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PdashboardComponent} from "../pdashboard/pdashboard.component";
import {ExamenProfComponent} from "./examen-prof.component";


const routes: Routes = [
  {
    path: '',
    component: ExamenProfComponent,
    data: {
      title: 'Professeur Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamenProfRoutingModule { }
