import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamenProfRoutingModule } from './examen-prof-routing.module';
import {ExamenProfComponent} from "./examen-prof.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap/alert";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ClassesRoutingModule} from "../classes/classes-routing.module";
import {QuestionOuvComponent} from "../question-ouv/question-ouv.component";
import {QuestionFileComponent} from "../question-file/question-file.component";
import {QuestionQcmComponent} from "../question-qcm/question-qcm.component";
import {ListerQuestionComponent} from "../lister-question/lister-question.component";
import {QuestionContentComponent} from "../question-content/question-content.component";
import {BrowserModule} from "@angular/platform-browser";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {BsModalService, ModalModule} from "ngx-bootstrap/modal";
import {TokenService} from "../../service/token/token.service";


@NgModule({

  imports: [
    ReactiveFormsModule,
    FormsModule,
    AlertModule,


    CommonModule,
    BsDropdownModule.forRoot(),
    NgbModalModule,

    CommonModule,
    ExamenProfRoutingModule,
    ModalModule.forRoot()

  ],
  declarations: [ExamenProfComponent ,QuestionOuvComponent,QuestionFileComponent,QuestionQcmComponent,
    ListerQuestionComponent,QuestionContentComponent],
  entryComponents: [QuestionContentComponent],
  providers: [
    BsModalService,

  ],


})
export class ExamenProfModule { }
