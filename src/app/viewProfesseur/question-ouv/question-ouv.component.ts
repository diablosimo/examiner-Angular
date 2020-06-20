import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Examen} from "../../model/examen";
import {QuestionService} from "../../service/question.service";
import {Question} from "../../model/question";

@Component({
  selector: 'app-question-ouv',
  templateUrl: './question-ouv.component.html',
  styleUrls: ['./question-ouv.component.css']
})
export class QuestionOuvComponent implements OnInit {
  questOuverteForm: FormGroup;
  alerts: any;
  question:Question= {contenu:"" };
  reponseDisponible:any;
  @Input() selectedExamen: Examen;
  @Input() api_token: string;

  hideResponse: Boolean=true;
  get questOuverteFormFormControl() {
    return this.questOuverteForm.controls;
  }
  constructor(private formbuilder: FormBuilder,private questionService:QuestionService) { }

  ngOnInit(): void {
this.question.contenu="";

    let patterns={
      reponse: ['', ],
      contenu: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      note:['', Validators.compose([Validators.required, Validators.min(0.25),Validators.required])],
      numero:['', Validators.compose([Validators.min(1), Validators.max(100),Validators.required])],

    };
    this.questOuverteForm=this.formbuilder.group(patterns);

  }

  onSubmit() {
    this.question.examen_id=this.selectedExamen.id;
    this.question.type_question="ouverte";
    this.alerts=[];
    let id=0;
    this.questionService.persist(this.alerts,this.question,this.api_token,id,(data) => {this.questOuverteForm.reset();
    });
  }


  onSelect($event: Event) {
    (<HTMLInputElement>event.target).checked ? this.hideResponse=false: this.hideResponse=true;
    (<HTMLInputElement>event.target).checked ? this.question.reponseDisponible=true: this.reponseDisponible=false;

  }
}
