import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EdashboardComponent} from "../../viewEtudiant/edashboard/edashboard.component";
import {AjoutReclamationComponent} from "./ajout-reclamation.component";


const routes: Routes = [
  {
    path: '',
    component: AjoutReclamationComponent,
    data: {
      title: 'Reclamations'
    },

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutReclamationRoutingModule { }
