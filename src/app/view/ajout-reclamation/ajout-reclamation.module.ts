import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjoutReclamationRoutingModule } from './ajout-reclamation-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap/alert";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {RouterModule} from "@angular/router";
import {EdashboardRoutingModule} from "../../viewEtudiant/edashboard/edashboard-routing.module";
import {AjoutReclamationComponent} from "./ajout-reclamation.component";


@NgModule({
  declarations: [AjoutReclamationComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    BsDropdownModule.forRoot(),
    RouterModule,
    CommonModule,
    AjoutReclamationRoutingModule
  ]
})
export class AjoutReclamationModule { }
