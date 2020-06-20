import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ExamensService} from '../../service/etudiant/examens.service';
import {Examen} from '../../model/examen';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ReponseEtudiant} from '../../model/reponse-etudiant';
import {ConfirmDialogComponent} from '../../containers/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  examen_id: any;
  examen: Examen;
  public angForm: FormGroup;
  reponses: ReponseEtudiant[] = [];
  index: number = 0;
  reponse: ReponseEtudiant = {texte: '', url: null, choix: '', choices: [], question_id: 0, etudiant_id: 0};
  remainTime: number = 0;

  apiToken: any;

  constructor(public activatedRoute: ActivatedRoute, private examenService: ExamensService, private formbuilder: FormBuilder, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.examen_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiToken = this.activatedRoute.snapshot.paramMap.get('apiToken');
    this.loadExamQuestions();
  }

  //charger les questions de l'examen
  loadExamQuestions() {
    this.examenService.loadExamQuestions(this.examen_id, this.apiToken).subscribe((examen) => {
      if (examen[0] < 0) {
        this.router.navigate(['/e/examens', {'message': examen[1], 'result': examen[0], 'apiToken': this.apiToken}]);
      } else {
        this.examen = examen[1];
        this.remainTime = this.getRemainTime();

        for (let q of this.examen.questions) {
          this.reponse.question_id = q.id;
          for (let c of q.choices) {
            this.reponse.choices.push('');
          }
          this.reponses.push(this.reponse);
          this.reponse = null;
          this.reponse = {texte: '', url: null, choix: '', choices: [], question_id: 0, etudiant_id: 0};
        }
      }

    });

  }

  file: File = null;

  onFileChange(files: FileList, reponseIndex: number) {
    this.file = files.item(0);
    this.reponses[reponseIndex].url = files.item(0);
    console.log(this.file);
  }

  //envoyer les reponses au serveur, apres confirmation
  onSubmit() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Attention!',
        message: 'Vous etes sur le point d\'envoyer vos réponses. Êtes-vous sûr? '
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.examenService.sendAnswers(this.reponses, this.apiToken, this.examen_id).subscribe((s) => {
          this.router.navigate(['/e/examens', {'message': s[1], 'result': s[0], 'apiToken': this.apiToken}]);
        });
      }
    });
  }

  //calcul du temos restant d'un examen, pour le compte a rebours dans l html
  getRemainTime() {
    let now = Date.now() / 1000;
    let date = new Date(this.examen.date_examen).getTime() / 1000;
    let d = this.examen.duree * 3600;
    const x: number = Math.floor(date + d - now);
    return x;
  }
}
