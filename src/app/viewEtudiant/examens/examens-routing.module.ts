import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClassesComponent} from "../../viewProfesseur/classes/classes.component";
import {ExamensComponent} from "./examens.component";
import {ExamenComponent} from "../examen/examen.component";


const routes: Routes = [
  {
    path: '',
    component: ExamensComponent,
    data: {
      title: 'examens'
    },

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamensRoutingModule { }
