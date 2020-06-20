import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReponsesModule} from "./reponses.module";
import {ReponsesComponent} from "./reponses.component";


const routes: Routes = [

  {
    path: '',
    component: ReponsesComponent,
    data: {
      title: 'reponses'
    },

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReponsesRoutingModule { }
