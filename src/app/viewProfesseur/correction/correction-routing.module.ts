import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CorrectionComponent} from "./correction.component";


const routes: Routes = [
  {
    path: '',
    component: CorrectionComponent,
    data: {
      title: 'correction'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorrectionRoutingModule { }
