import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EtudiantsComponent} from "../etudiants/etudiants.component";
import {EdashboardComponent} from "./edashboard.component";


const routes: Routes = [
  {
    path: '',
    component: EdashboardComponent,
    data: {
      title: 'Etudiant'
    },

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EdashboardRoutingModule { }
