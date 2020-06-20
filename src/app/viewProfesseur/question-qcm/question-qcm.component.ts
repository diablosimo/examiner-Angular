import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../model/question";
import {Examen} from "../../model/examen";
import { FormControl, FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {QuestionService} from "../../service/question.service";

@Component({
  selector: 'app-question-qcm',
  templateUrl: './question-qcm.component.html',
  styleUrls: ['./question-qcm.component.css']
})
export class QuestionQcmComponent implements OnInit {
  questQcmForm: FormGroup;
  question:Question= {contenu:"" };
  @Input() selectedExamen: Examen;
  @Input() api_token: string;
  nbChoix: number=2;
  alerts: any;
  numbers:any = [1,2];
  reponseArray:any = new Array();



  constructor(private formbuilder: FormBuilder,private questionService:QuestionService) { }

  ngOnInit(): void {
    this.question.contenu="";
    this.question.reponseDisponible=true;
    this.question.type_question="qcm";
    let patterns={
      contenu: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      note:['', Validators.compose([Validators.required, Validators.min(0.25),Validators.required])],
      numero:['', Validators.compose([Validators.min(1), Validators.max(100),Validators.required])],
      nbChoix:['', Validators.compose([Validators.required])],
      reponseCorrecte:['', Validators.compose([Validators.required])],
      reponse1:['', ],      reponse2:['', ],      reponse3:['', ],      reponse4:['', ],

    };
    this.questQcmForm=this.formbuilder.group(patterns);
  }

  onSubmit() {
    this.question.examen_id=this.selectedExamen.id;

    this.question.nbReponse=this.nbChoix;
    this.question.reponse1=this.reponseArray[0];this.question.reponse2=this.reponseArray[1];
    this.question.reponse3=this.reponseArray[2];this.question.reponse4=this.reponseArray[3];
    this.alerts=[];
    let id=0;
    this.questionService.persist(this.alerts,this.question,this.api_token,id,(data) => {this.questQcmForm.reset();
    });
  }
  get questQcmFormControl() {
    return this.questQcmForm.controls;
  }

  onSelect($event: Event) {
this.numbers=[];
    this.reponseArray=[];
    for (var i = 1; i <= this.nbChoix; i++) {
      this.numbers.push(i);
    }
  }
}
