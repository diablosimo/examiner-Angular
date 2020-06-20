import { Component, OnInit } from '@angular/core';
import {Classe} from '../../model/classe';
import {ExamensService} from '../../service/etudiant/examens.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {TokenService} from "../../service/token/token.service";


@Component({
  selector: 'app-examens',
  templateUrl: './examens.component.html',
  styleUrls: ['./examens.component.css']
})
export class ExamensComponent implements OnInit {
  classes: Classe [] = [];
  alerts: any[]= new Array();
  msg:String;
  result:number=0;

  apiToken;

  constructor(private tokenService:TokenService,private examenService: ExamensService, private router: Router,public activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['apiToken']){
      this.apiToken=this.activatedRoute.snapshot.params['apiToken'];
       this.tokenService.SetTok(this.apiToken);
    }
    else{
      this.apiToken=this.tokenService.GetTok();
    }
    this.msg=this.activatedRoute.snapshot.params['message'];
    this.result=this.activatedRoute.snapshot.params['result'];

    if(this.result<0){
      this.pushNotification('warning',this.msg);
    }else if(this.result==2){
      this.pushNotification('success',this.msg);
    }
    this.getFutureExamens();
  }

  //charger les examen futur ou courant qui n'ont pas eté passé par l'etudiant
  getFutureExamens() {
    this.examenService.findFutureExamens(this.apiToken).subscribe(reponse => {
      if ( reponse[0] === 1) {
      this.classes = reponse[1].classes;
      }
    });
  }

  //verifie si la date actuelle est comprise entre la date de debut et celle de fin de l'examen , pour afficher ou non le bouton 'participer'
  isTimeToPassExam(date_examen: string, duree: number){
    let now = Date.now();
    let date = new Date(date_examen).getTime();
    let d = duree*3600*1000;
    if(now>date && now<date+d){
      return true;
    }else{
      return false;
    }
  }

  //naviguer ves la page de l'examen
  gotoExam(id: number) {
    this.router.navigate(['/e/examen',{id:id,apiToken:this.apiToken}], )
  }

  //pour ajouter une notification dans le composant associé a l'objet alerts
  pushNotification(type: String, msg: String) {
    this.alerts.push({
      type: type,
      msg: msg,
      timeout: 4500
    });
  }

  //utiliser dans l'html, our transformer un objet en tableau pour la parcours avec la boucle ngFor
  toArray(o: object) {
    return Object.keys(o).map(key => o[key])
  }
}
