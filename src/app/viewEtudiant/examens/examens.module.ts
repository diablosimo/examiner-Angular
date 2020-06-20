import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamensRoutingModule } from './examens-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap/alert";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ExamensComponent} from "./examens.component";
import {ExamenComponent} from "../examen/examen.component";
import {CountdownModule} from "ngx-countdown";
import {MatDialogModule} from '@angular/material/dialog';
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [ExamensComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    CommonModule,
    ExamensRoutingModule,
    RouterModule,

  ]
})
export class ExamensModule { }
