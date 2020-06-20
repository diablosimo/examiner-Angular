import { Component, OnInit } from '@angular/core';
import {Examen} from '../../model/examen';
import {ActivatedRoute} from '@angular/router';
import {ReponsesService} from '../../service/etudiant/reponses.service';
import {QuestionReponse} from '../../model/question-reponse';

@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.css']
})
export class ReponseComponent implements OnInit {
  examen_id: any;
  examen: Examen;
  questionReponses: QuestionReponse[];
  apiToken:any;

  constructor(public activatedRoute: ActivatedRoute,private reponsesService:ReponsesService) { }

  ngOnInit(): void {
    this.examen_id=this.activatedRoute.snapshot.params['eid'];
    this.apiToken=this.activatedRoute.snapshot.params['apiToken'];

    this.loadReponses(this.examen_id);
  }

  //charger les question et les reponses d'un etudiant dans un examen
  loadReponses(id:number){
    this.reponsesService.loadReponses(id,this.apiToken).subscribe((response) => {
      if (response[0]===1){
        this.questionReponses=response[1];
      }
    });
  }
}
