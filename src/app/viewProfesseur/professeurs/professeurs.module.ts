import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesseursRoutingModule } from './professeurs-routing.module';
import {ProfesseursComponent} from "./professeurs.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap/alert";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TokenService} from "../../service/token/token.service";


@NgModule({
  declarations: [ProfesseursComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    ProfesseursRoutingModule
  ],

})
export class ProfesseursModule { }
