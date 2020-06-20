import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorrectionRoutingModule } from './correction-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap/alert";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ClassesRoutingModule} from "../classes/classes-routing.module";
import {CorrectionComponent} from "./correction.component";
import {CorrectionItemComponent} from "../correction-item/correction-item.component";
import {TokenService} from "../../service/token/token.service";


@NgModule({
  declarations: [CorrectionComponent,CorrectionItemComponent],
  imports: [
    CommonModule,
    CorrectionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    FormsModule,
  ]

})
export class CorrectionModule { }
