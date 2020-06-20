import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from "../../service/question.service";
import {Question} from "../../model/question";
import {Examen} from "../../model/examen";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {QuestionContentComponent} from "../question-content/question-content.component";
import {Choix, Solution} from "../../model/solution";

@Component({
  selector: 'app-lister-question',
  templateUrl: './lister-question.component.html',
  styleUrls: ['./lister-question.component.css']
})
export class ListerQuestionComponent implements OnInit {
  @Input() questions: Question[]=new Array();
  question:Question= {contenu:"" };
  @Input() selectedExamen: Examen;
  @Input() api_token: string;
  bsModalRef: BsModalRef;
  solution:Solution;
  lesChoix:Choix[]=[];
  constructor(private modalService: BsModalService,private questionService:QuestionService) { }

  ngOnInit(): void {
  }

  ShowSelectedQuestion(question: any) {
    this.questionService.getDetailQuestionsOfExam(question.id,this.api_token).subscribe((data) => {
      this.solution=data['solution'];

if(data['choix'])  this.lesChoix=data['choix'];else this.lesChoix=[];
      const initialState = {
       lesChoix:this.lesChoix,
        solution:this.solution,
        question:question,

        title: 'Les détails de la question'
      };
      this.bsModalRef = this.modalService.show(QuestionContentComponent, {initialState});
      this.bsModalRef.content.closeBtnName = 'Close';
    });



  }

  deleteSelectedQuestion(question: Question) {
    if(confirm("Vous voulez vraiement supprimer cette question :"+question.contenu)) {
      this.questionService.delete(question.id,this.api_token).subscribe(() => {
        this.questions.indexOf(question);
        this.questions.splice(this.questions.indexOf(question),1);
          });
    }

  }
}
