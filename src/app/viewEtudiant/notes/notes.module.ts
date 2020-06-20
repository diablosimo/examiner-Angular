import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap/alert";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ExamensRoutingModule} from "../examens/examens-routing.module";
import {RouterModule} from "@angular/router";
import {NotesComponent} from "./notes.component";


@NgModule({
  declarations: [NotesComponent],
  imports: [
    ReactiveFormsModule,
    AlertModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    RouterModule,

    CommonModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
