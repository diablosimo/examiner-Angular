import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Question} from "../../model/question";
import {Examen} from "../../model/examen";
import {QuestionService} from "../../service/question.service";

@Component({
  selector: 'app-question-file',
  templateUrl: './question-file.component.html',
  styleUrls: ['./question-file.component.css']
})
export class QuestionFileComponent implements OnInit {
  alerts: any;
  questFileForm: FormGroup;
  question:Question= {contenu:"" };
  @Input() selectedExamen: Examen;
  @Input() api_token: string;
  get questFileFormControl() {
    return this.questFileForm.controls;
  }
  constructor(private formbuilder:FormBuilder,private questionService:QuestionService) { }

  ngOnInit(): void {
    this.question.reponseDisponible=true;
    this.question.type_question="fichier";
    let patterns={
      contenu: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      note:['', Validators.compose([Validators.required, Validators.min( 0.25),Validators.required])],
      numero:['', Validators.compose([Validators.min(1), Validators.max(100),Validators.required])],

    };
    this.questFileForm=this.formbuilder.group(patterns);
  }

  onSubmit() {
    this.question.examen_id=this.selectedExamen.id;
    this.question.reponse="x";
    this.alerts=[];
    let id=0;
    this.questionService.persist(this.alerts,this.question,this.api_token,id,(data) => {this.questFileForm.reset();
    });
  }
}
