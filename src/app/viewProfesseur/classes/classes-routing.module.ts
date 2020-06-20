import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClassesComponent} from "./classes.component";


const routes: Routes = [
  {
    path: '',
    component: ClassesComponent,
    data: {
      title: 'classes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
