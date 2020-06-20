import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Question} from "../model/question";
import {ReponseEtudiant} from "../model/ReponseEtudiant";
import {Examen} from "../model/examen";
import {Etudiant} from "../model/etudiant";
import {EtudiantExamen} from "../model/etudiantExamen";

@Injectable({
  providedIn: 'root'
})
export class ReponseEtudiantService {


  getDetailQuestionsOfExamUrl = 'http://127.0.0.1:8000/api/professor/getReponseEtudiantOfExam';
  sendCorrectionEtudiantOfExamUrl = 'http://127.0.0.1:8000/api/professor/getCorrectionEtudiantOfExam';
  getNotesEtudiantOfExamUrl= 'http://127.0.0.1:8000/api/professor/getNotesEtudiantOfExam';
  h = new HttpHeaders().append('Content-Type', 'application/json')
    .append('Accept','application/json');
  constructor(private http: HttpClient) { }

  getReponsesEtudiant(examen:Examen,etudiant:Etudiant,object:String) {
    return this.http.get<ReponseEtudiant[]>(this.getDetailQuestionsOfExamUrl+
      "?api_token="+object+"&examen_id="+examen.id+"&etudiant_id="+etudiant.id);
  }
  ///getNotesEtudiantOfExam
  getNotesEtudiant(examen:Examen,object:String) {
    return this.http.get<EtudiantExamen[]>(this.getNotesEtudiantOfExamUrl+
      "?api_token="+object+"&examen_id="+examen.id);
  }
  sendCorrectionEtudiantOfExam(detail,object:String,alerts:any) {
    return this.http.post(this.sendCorrectionEtudiantOfExamUrl+"?api_token="+object,detail).subscribe(
      (data) =>
      {
        if(data==1) this.pushNotification(alerts,'success','Correction validé et note globale crée')
      else this.pushNotification(alerts,'danger','Correction invalidé par le serveur')
      })
  }
  pushNotification(alerts:any,type: String, msg: String) {
    alerts.push({
      type: type,
      msg: msg,
      timeout: 4500
    });
    return null;
  }

}
