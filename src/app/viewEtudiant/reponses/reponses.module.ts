import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReponsesRoutingModule } from './reponses-routing.module';
import {ReponsesComponent} from "./reponses.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap/alert";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [ReponsesComponent],
  imports: [
    ReactiveFormsModule,
    AlertModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    CommonModule,
    RouterModule,
    CommonModule,
    ReponsesRoutingModule
  ]
})
export class ReponsesModule { }
