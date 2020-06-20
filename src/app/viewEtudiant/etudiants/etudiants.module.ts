import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantsRoutingModule } from './etudiants-routing.module';
import {EtudiantsComponent} from "./etudiants.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap/alert";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ExamensRoutingModule} from "../examens/examens-routing.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [EtudiantsComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    RouterModule,
    CommonModule,
    EtudiantsRoutingModule
  ]
})
export class EtudiantsModule { }
