import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {Choix, Solution} from "../../model/solution";
import {Question} from "../../model/question";

@Component({
  selector: 'app-question-content',
  templateUrl: './question-content.component.html',
  styleUrls: ['./question-content.component.css']
})
export class QuestionContentComponent implements OnInit {

  title: string;
  closeBtnName: string;
solution:Solution;
lesChoix:Choix[]=[];
question:Question;
choixCorrecteList:number[]=[];
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    //

    this.choixCorrecteList = this.solution.choix.split(',').map(function(item) {
      return parseInt(item, 10);
    });
  }
}
