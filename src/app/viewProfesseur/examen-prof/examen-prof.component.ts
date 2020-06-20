import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Classe} from "../../model/classe";
import {Examen} from "../../model/examen";
import * as moment from 'moment';
import {ClasseService} from "../../service/classe.service";
import {ExamService} from "../../service/exam.service";
import {QuestionService} from "../../service/question.service";
import {Question} from "../../model/question";
import {TokenService} from "../../service/token/token.service";

@Component({
  selector: 'app-examen-prof',
  templateUrl: './examen-prof.component.html',
  styleUrls: ['./examen-prof.component.css']
})
export class ExamenProfComponent implements OnInit {

  angForm: any;
  examens: Examen [] = [];
  classes: Classe [] = [];
  questions: Question[] =[];
  api_token:string;
  resultFilter: Classe [] = [];
  alerts: any[];
  examen: Examen = {bareme: 100, date_examen: undefined, duree:0 , seuil_reussite: 0, nom: ''};
  selectedExamen: Examen = {bareme: 100, date_examen: new Date(), duree:0 , seuil_reussite: 0, nom: 'ccc'};
  findExamsByClasseForm: any;
  falseCreate: Boolean=false;
  falseVoir: Boolean=true;
  selectedExamPartFalse: Boolean=true;
  /////////////////////
  qstOuvertFalse: Boolean=true;
  qstQcmFalse: Boolean=true;
  qstFileFalse: Boolean=true;
  listerQstFalse: Boolean=true;
  /////////////////////
  constructor( private tokenService:TokenService,
    private questionService:QuestionService,private examService:ExamService,private classeService: ClasseService,private formbuilder: FormBuilder,) { }
  get angFormControl() {
    return this.angForm.controls;
  }
  get findExamsByClasseFormControl() {
    return this.findExamsByClasseForm.controls;
  }
  ngOnInit(): void {
    this.api_token=this.tokenService.GetTok();

    let patterns={
      nom: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
     date_examen : ['', Validators.compose([Validators.required, ])],
      duree:         ['', Validators.compose([Validators.required,])],
      seuil_reussite:['', Validators.compose([Validators.required, Validators.min(5),Validators.max(this.examen.bareme.valueOf()),Validators.required])],
      bareme:['', Validators.compose([Validators.min(10), Validators.max(100),Validators.required])],
      classe_id:[null, [Validators.required]],

    };
    let patterns1={
      classe_id:[null, [Validators.required]],
    };
    this.angForm=this.formbuilder.group(patterns,);
    this.findExamsByClasseForm=this.formbuilder.group(patterns1);

    this.getclasses();
    this.findExams()
  }

ValidateSeuil(angForm :FormGroup) {
  let seuil_reussite = angForm.get('seuil_reussite').value;
  let bareme = angForm.get('bareme').value;
  if(bareme<=seuil_reussite) { return null ;}
  else {
    ValidateSeuil: true}
}

  getclasses() {
    this.classeService.findAll(this.api_token)
      .subscribe(classes => {
        this.classes = classes;
        this.resultFilter = classes;
      });
  }
  persistExamen() {
    this.alerts=[];
    let id=0;
      this.examService.persist(this.alerts,this.examen,this.api_token,id,(data) => {this.findExams();this.angForm.reset();
    });

  }


  pushNotification(type: String, msg: String) {
    this.alerts.push({
      type: type,
      msg: msg,
      timeout: 4500
    });
  }


  onSubmit() {

this.examen.classe_id=this.angForm.get("classe_id").value;
    this.examen.date_examen=this.angForm.get("date_examen").value;
    this.examen.duree=this.timeStringToFloat(this.angForm.get("duree").value);

this.persistExamen();

  }

 timeStringToFloat(time) {
  const hoursMinutes = time.split(/[.:]/);
   const hours = parseInt(hoursMinutes[0], 10);
   const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
   return hours + minutes / 60;
}

  findExamsByClasse() {
   let id_classe= this.findExamsByClasseForm.get("classe_id").value;
    this.examService.findExamsByClasse(id_classe,this.api_token)
      .subscribe(examens => {
        this.examens = examens;
      });
  }
  findExams() {
    this.examService.findAll(this.api_token)
      .subscribe(examens => {
        this.examens = examens;
      });
  }

  goToVoir() {

    this.falseCreate=true;
    this.falseVoir=false;
    this.selectedExamPartFalse=true;
    this.showQuestionsType(true,true,true,true)
    this.getQuestionOfExam();
  }

  goTocreate() {
    this.falseCreate=false;
    this.falseVoir=true;
    this.selectedExamPartFalse=true;
this.showQuestionsType(true,true,true,true)
  }

  showSelectedExam(examen: Examen) {
    this.selectedExamen=examen;
    this.falseCreate=true;
    this.falseVoir=true;
    this.selectedExamPartFalse=false;

  }

  showQstFichier() {
    this.showQuestionsType(true,true,false,true);
  }

  showQstOuverte() {
    this.showQuestionsType(false,true,true,true);
  }

  showQcm() {
    this.showQuestionsType(true,false,true,true);
  }
  showQuestionsType(v1,v2,v3,v4){
    this.qstOuvertFalse=v1;
    this.qstQcmFalse=v2;
    this.qstFileFalse=v3;
    this.listerQstFalse=v4;
  }


  showListQst() {
    this.showQuestionsType(true,true,true,false,);
    this.getQuestionOfExam();
  }

getQuestionOfExam() {
    if(this.selectedExamen.id){
  this.questionService.getQuestionsOfExam(this.selectedExamen.id,this.api_token)
    .subscribe(questions => {
      console.log(questions);
      this.questions = questions;
    });
}}}


export class YourValidator {
  static dateVaidator(AC: AbstractControl) {
    if (AC && AC.value && !moment(AC.value, 'YYYY-MM-DD',true).isValid()) {
      return {'dateVaidator': true};
    }
    return null;
  }
}

