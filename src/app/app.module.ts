import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LocationStrategy, HashLocationStrategy, CommonModule, DatePipe} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';

import { LoginComponent } from './view/login/login.component';
import { RegisterComponent } from './view/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule, MatSpinner} from "@angular/material/progress-spinner";
import { HttpSpinnerComponent } from './view/http-spinner/http-spinner.component';
import {InterceptorService} from "./service/interceptor-service.service";
import {AlertModule} from "ngx-bootstrap/alert";
import { VerificationcodeComponent } from './view/verificationcode/verificationcode.component';
import { FirstVisitComponent } from './view/first-visit/first-visit.component';
import {CarouselModule} from "ngx-bootstrap/carousel";
import { PasswordResetComponent } from './view/password-reset/password-reset.component';
import { ClassesComponent } from './viewProfesseur/classes/classes.component';
import { ExamenProfComponent } from './viewProfesseur/examen-prof/examen-prof.component';
import { QuestionOuvComponent } from './viewProfesseur/question-ouv/question-ouv.component';
import { QuestionFileComponent } from './viewProfesseur/question-file/question-file.component';
import { QuestionQcmComponent } from './viewProfesseur/question-qcm/question-qcm.component';
import { ListerQuestionComponent } from './viewProfesseur/lister-question/lister-question.component';
import { QuestionContentComponent } from './viewProfesseur/question-content/question-content.component';
import { ModalModule} from 'ngx-bootstrap/modal';
import { CorrectionComponent } from './viewProfesseur/correction/correction.component';
import { CorrectionItemComponent } from './viewProfesseur/correction-item/correction-item.component';
import { EtudiantsComponent } from './viewEtudiant/etudiants/etudiants.component';
import {HttpErrorHandler} from "./service/HttpErrorHandler";
import {MessageService} from "./service/MessageService";
import {ExamenComponent} from "./viewEtudiant/examen/examen.component";
import {CountdownModule} from "ngx-countdown";
import {MatDialogModule} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "./containers/confirm-dialog/confirm-dialog.component";
import {MatCardModule} from "@angular/material/card";
import {ReponseComponent} from "./viewEtudiant/reponse/reponse.component";
import { AjoutReclamationComponent } from './view/ajout-reclamation/ajout-reclamation.component';
import {ReclamationsComponent} from "./view/reclamation/reclamation.component";
import {TokenService} from "./service/token/token.service";



@NgModule({
  imports: [
    ///////
    HttpClientModule,
    MatProgressSpinnerModule,
    AlertModule.forRoot(),/*it works!*/
    //////
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    CarouselModule,
    ModalModule.forRoot(),
    CountdownModule,
    MatDialogModule,
    MatCardModule,
    BrowserAnimationsModule,
    CommonModule
  ],
 entryComponents: [ConfirmDialogComponent],


  exports: [
    ConfirmDialogComponent
  ],

  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    LoginComponent,
    RegisterComponent,
    HttpSpinnerComponent,
    VerificationcodeComponent,
   FirstVisitComponent,
    PasswordResetComponent,
    ExamenComponent,
    ConfirmDialogComponent,
    ReponseComponent,
    //  ClassesComponent,
    ReclamationsComponent,


  ],
  providers:

    [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
      TokenService,
    MessageService,
    HttpErrorHandler,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },

    DatePipe,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
