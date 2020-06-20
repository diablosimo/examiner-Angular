import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Classe} from "../model/classe";
import {Etudiant} from "../model/etudiant";
import {Examen} from "../model/examen";
import {catchError, retry} from "rxjs/operators";
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  apiUrl = 'http://127.0.0.1:8000/api/professor/examen';
  affectUrl = 'http://127.0.0.1:8000/api/professor/affect';
  findExamsByClasseUrl = 'http://127.0.0.1:8000/api/professor/findExamsByClasse';
findAllExamUrl="http://127.0.0.1:8000/api/professor/findAllExams"
  h = new HttpHeaders().append('Content-Type', 'application/json')
    .append('Accept','application/json');
  constructor(private http: HttpClient) { }

  findExamsByClasse(classe_id,object:String) {
    return this.http.get<Examen[]> (this.findExamsByClasseUrl+"?api_token="+object+"&classe_id="+classe_id);
  }

  findAll(object:String) {
    return this.http.get<Examen[]> (this.findAllExamUrl+"?api_token="+object);
  }

  persist(alerts:any ,examen: Examen,object:String,id,callback) {
    return this.http.post<Examen>(this.apiUrl+"?api_token="+object, examen)

  .pipe(
      retry(1),
      catchError(this.handleError)
    ).subscribe(

     exam =>{
       if(exam.id==0){
         this.pushNotification(alerts ,'danger','Erreur')
       }
else{
       id=exam,callback(id),this.pushNotification(alerts ,'success','Ajout avec succèes')
     }},
     err =>{id=0,this.pushNotification(alerts ,'danger','Erreur'+err)  },
   );


}

handleError(error) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // client-side error
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
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
