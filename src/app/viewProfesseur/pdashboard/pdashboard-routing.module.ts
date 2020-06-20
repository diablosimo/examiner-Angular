import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PdashboardComponent} from "./pdashboard.component";


const routes: Routes = [
  {
    path: '',
    component: PdashboardComponent,
    data: {
      title: 'Professeur Dashboard'
    }
  }
];

@NgModule({
  imports:

    [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdashboardRoutingModule { }
