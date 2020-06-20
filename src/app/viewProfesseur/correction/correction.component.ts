import { Component, OnInit } from '@angular/core';
import {Examen} from "../../model/examen";
import {Classe} from "../../model/classe";
import {Question} from "../../model/question";
import {QuestionService} from "../../service/question.service";
import {ExamService} from "../../service/exam.service";
import {ClasseService} from "../../service/classe.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Etudiant} from "../../model/etudiant";
import {ReponseEtudiantService} from "../../service/reponse-etudiant.service";
import {ReponseEtudiant} from "../../model/ReponseEtudiant";
import {TokenService} from "../../service/token/token.service";
import {EtudiantExamen} from "../../model/etudiantExamen";

@Component({
  selector: 'app-correction',
  templateUrl: './correction.component.html',
  styleUrls: ['./correction.component.css']
})
export class CorrectionComponent implements OnInit {
  angForm: any;
  examens: Examen [] = [];
  classes: Classe [] = [];
  etudiantNotes: EtudiantExamen [] = [];

  api_token:string;
  alerts: any[];
  examen: Examen = {bareme: 100, date_examen: undefined, duree:0 , seuil_reussite: 0, nom: ''};
  selectedExamen: Examen = {bareme: 100, date_examen: new Date(), duree:0 , seuil_reussite: 0, nom: 'ccc'};
  findExamsByClasseForm: any;
  falseCreate: Boolean=false;
  falseVoir: Boolean=true;
  selectedExamPartFalse: Boolean=true;
  correctionPartFalse: Boolean=true;

  qstOuvertFalse: Boolean=true;
  qstQcmFalse: Boolean=true;
  qstFileFalse: Boolean=true;
  listerQstFalse: Boolean=true;
  private resultFilter: Classe[];
  private listEtudiant: Etudiant[];
  private etudiantReponses:ReponseEtudiant[]=[];
  listEtudiantFalse: Boolean=true;
  private selectedClasse: Classe= { nom: ''};
  private questions: Question[]=[];
  private selectedEtudiant: Etudiant= { nom:'',prenom:''};
  constructor(private tokenService:TokenService,
    private reponseEtudiantService:ReponseEtudiantService,
    private questionService:QuestionService,private examService:ExamService,private classeService: ClasseService,private formbuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.api_token=this.tokenService.GetTok();
    let patterns1={
      classe_id:[null, [Validators.required]],
    };
    this.findExamsByClasseForm=this.formbuilder.group(patterns1);
    this.getclasses();
    this.findExams();
  }
  get findExamsByClasseFormControl() {
    return this.findExamsByClasseForm.controls;
  }
  getclasses() {
    this.classeService.findAll(this.api_token)
      .subscribe(classes => {
        this.classes = classes;
        this.resultFilter = classes;
      });
  }
  findExamsByClasse() {
    let id_classe= this.findExamsByClasseForm.get("classe_id").value;
    this.examService.findExamsByClasse(id_classe,this.api_token)
      .subscribe(examens => {
        this.examens = examens;
      });
  }
  getQuestionsOfExam() {
    this.questionService.getQuestionsOfExam(this.selectedExamen.id,this.api_token)
      .subscribe(questions => {
        this.questions = questions;
      });
  }
  findExams() {
    this.examService.findAll(this.api_token)
      .subscribe(examens => {
        console.log(examens);
        this.examens = examens;
      });
  }
  showSelectedExam(examen: Examen) {
    this.selectedExamen=examen;
    this.selectedClasse=this.classes.find(x => x.id.toString() == examen.classe_id);
    this.falseCreate=true;
    this.falseVoir=true;
    this.selectedExamPartFalse=false;
    this.listEtudiantFalse=true;
    this.correctionPartFalse=true;
this.noteEtudiantFalse=true;

  }

  goToVoir() {
    this.falseCreate=true;
    this.falseVoir=false;
    this.selectedExamPartFalse=true;
    this.listEtudiantFalse=true;
    this.correctionPartFalse=true;
    this.noteEtudiantFalse=true;


  }
///lister les étudiants autorisé à passer  l'examen selectionnée;
  getEtudiantOfExam(selectedExamen: Examen) {
    this.correctionPartFalse=true;
    let classe =  this.classes.find(x => x.id.toString() == selectedExamen.classe_id);
    this.listEtudiant =classe.etudiants ;
    this.listEtudiantFalse=false;
    this.noteEtudiantFalse=true;

  }
///lister les reponse d'étudiant dans un l'examen selectionnée;
  noteEtudiantFalse: Boolean=true;
  getReponseEtudiant(etudiant: Etudiant) {

    this.listEtudiantFalse=true;
     this.selectedEtudiant=etudiant;
    this.reponseEtudiantService.getReponsesEtudiant(this.selectedExamen,etudiant,this.api_token)
      .subscribe(reponsesEtudiant => {
        this.etudiantReponses = reponsesEtudiant;
        this.correctionPartFalse=false;
        this.getQuestionsOfExam()

      });
  }

  getNotesEtudiantOfExam(selectedExamen: Examen) {
    this.reponseEtudiantService.getNotesEtudiant(this.selectedExamen,this.api_token)
      .subscribe(etudiantNotes => {
        this.etudiantNotes = etudiantNotes;
        this.noteEtudiantFalse=false;
this.listEtudiantFalse=true;

      });
  }
}
