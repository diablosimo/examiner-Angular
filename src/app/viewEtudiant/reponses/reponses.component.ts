import { Component, OnInit } from '@angular/core';
import {Classe} from '../../model/classe';
import {ReponsesService} from '../../service/etudiant/reponses.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from "../../service/token/token.service";

@Component({
  selector: 'app-reponses',
  templateUrl: './reponses.component.html',
  styleUrls: ['./reponses.component.css']
})
export class ReponsesComponent implements OnInit {
  classes: Classe [] = [];
  apiToken;

  constructor(private tokenService:TokenService,private reponseService: ReponsesService,private router: Router,public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.apiToken=this.tokenService.GetTok();
    this.loadExams(this.apiToken);
  }

//charger les examen deja passée
  loadExams(api_token:String) {
    this.reponseService.loadClassesWithExams(this.apiToken).subscribe(reponse => {
      if ( reponse[0] === 1) {
        this.classes = reponse[1];
      }
    });
  }

//naviguer vers la page des reponses de l'etudiant dans cet examen
  voirReponse(id: number) {
    this.router.navigate(['/e/reponse',{'eid': id,'apiToken':this.apiToken}])
  }

  toArray(o: object) {
    return Object.keys(o).map(key => o[key])
  }
}
