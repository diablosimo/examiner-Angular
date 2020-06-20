import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import {ClassesComponent} from "./classes.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AlertModule} from "ngx-bootstrap/alert";

import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TokenService} from "../../service/token/token.service";



@NgModule({
  declarations: [ClassesComponent],
  imports: [

    //////
    ReactiveFormsModule,
    FormsModule,
    AlertModule,


    CommonModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    ClassesRoutingModule,
  ],


})
export class ClassesModule { }
