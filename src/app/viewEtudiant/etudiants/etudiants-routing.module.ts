import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExamensComponent} from "../examens/examens.component";
import {EtudiantsComponent} from "./etudiants.component";


const routes: Routes = [
  {
    path: '',
    component: EtudiantsComponent,
    data: {
      title: 'Etudiant'
    },

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantsRoutingModule { }
