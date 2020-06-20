import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EdashboardRoutingModule } from './edashboard-routing.module';
import {EdashboardComponent} from "./edashboard.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap/alert";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {RouterModule} from "@angular/router";
import {ChartsModule} from "ng2-charts";


@NgModule({
  declarations: [EdashboardComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    BsDropdownModule.forRoot(),
    RouterModule,
    CommonModule,
    EdashboardRoutingModule,
    ChartsModule
  ]
})
export class EdashboardModule { }
