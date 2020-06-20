import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExamensComponent} from "../examens/examens.component";
import {NotesComponent} from "./notes.component";


const routes: Routes = [

  {
    path: '',
    component: NotesComponent,
    data: {
      title: 'notes'
    },

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
