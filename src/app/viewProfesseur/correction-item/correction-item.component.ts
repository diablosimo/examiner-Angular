import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Question} from "../../model/question";
import {Examen} from "../../model/examen";
import {ReponseEtudiant} from "../../model/ReponseEtudiant";
import {Etudiant} from "../../model/etudiant";
import {QuestionContentComponent} from "../question-content/question-content.component";
import {QuestionService} from "../../service/question.service";
import {ReponseEtudiantService} from "../../service/reponse-etudiant.service";

@Component({
  selector: 'app-correction-item',
  templateUrl: './correction-item.component.html',
  styleUrls: ['./correction-item.component.css']
})
export class CorrectionItemComponent implements OnInit,OnChanges {

  @Input() questions: Question[];
  @Input() etudiantReponses: ReponseEtudiant[];
  @Input() api_token: string;
  @Input() etudiant: Etudiant;
  listDetail:any=[];
  alerts: any;



  constructor( private  reponseEtudiantService:ReponseEtudiantService,private questionService:QuestionService) { }

  ngOnInit(): void {
  }


  searchForQuestionDetail() {
    this.listDetail=[];
    this.questions.forEach(function (question) {
    this.questionService.getDetailQuestionsOfExam(question.id,this.api_token).subscribe((data) => {
      let solution=data['solution'];
      let lesChoix=[];
      if(data['choix']){   lesChoix=data['choix']; }
      const initialState = {
        question:question,
        lesChoix:lesChoix,
        solution:solution,
        reponseEtudiant:this.etudiantReponses.find(element => element.question_id==question.id),
      };
      this.listDetail.push( initialState);
      this.persistAutomaticCorrection(initialState);
    })
    }.bind(this));
    console.log(this.listDetail)
  }



  persistAutomaticCorrection( item: any) {
    if(item.question.type_question=="qcm"){

      if(item.solution.choix==item.reponseEtudiant.choix){
        item.reponseEtudiant.note=item.question.note;
    }
    else{
      item.reponseEtudiant.note=0;
      }}
  }
  persistAutomaticCorrection1($event:Event , item: any) {
  if(  (<HTMLInputElement>event.target).checked )
  {
    if(item.solution.choix==item.reponseEtudiant.choix)
      item.reponseEtudiant.note=item.question.note;
  }
  else{
    item.reponseEtudiant.note=0;
  }
  }
  noteCollect(){

  }
      ngOnChanges(changes: SimpleChanges) {
if(changes['questions']) {
        if(changes['questions'].currentValue.length>0)
           this.searchForQuestionDetail();
        }
      }
  pushNotification(type: String, msg: String) {
    this.alerts.push({
      type: type,
      msg: msg,
      timeout: 4500
    });
    return null;
  }
  validerNotesSaisie():Boolean {
this.alerts=[];
let val:Boolean=true;
    this.listDetail.forEach(function (item) {
       if(item.reponseEtudiant.note>item.question.note){
this.pushNotification('danger','La question N:'+item.question.numero+'a une note attribuée plus grand que la note maximale');
       val=false
       }
    }.bind(this));
    return val;
  }
  validerCorrection() {
    let corrections=[];
if(this.validerNotesSaisie()==true){
  let etudiant_id=0;let examen_id=0;
    this.listDetail.forEach(function (item) {
        const initialState = {
          question_id:item.question.id,
          note:item.reponseEtudiant.note,
          reponse_id:item.reponseEtudiant.id,
        };
       etudiant_id=item.question.examen_id; examen_id=item.reponseEtudiant.etudiant_id;

      corrections.push( initialState);
}
    .bind(this));
  this.reponseEtudiantService.sendCorrectionEtudiantOfExam([corrections,etudiant_id,examen_id],this.api_token,this.alerts);
}

}}

