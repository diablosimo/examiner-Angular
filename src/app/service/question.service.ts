import { Injectable } from '@angular/core';
import {Examen} from "../model/examen";
import {catchError, retry} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Question} from "../model/question";
import {throwError} from "rxjs";
import {Classe} from "../model/classe";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  apiUrl = 'http://127.0.0.1:8000/api/professor/createQuestion';
  getUrl = 'http://127.0.0.1:8000/api/professor/getQuestions';
  deleteUrl = 'http://127.0.0.1:8000/api/professor/deleteQuestion';
  getDetailUrl = 'http://127.0.0.1:8000/api/professor/getQuestionDetails';

  h = new HttpHeaders().append('Content-Type', 'application/json')
    .append('Accept','application/json');
  constructor(private http: HttpClient) { }

persist(alerts:any ,question: Question,object:String,id,callback) {
  return this.http.post<Question>(this.apiUrl+"?api_token="+object, question)
    .pipe(retry(1), catchError(this.handleError)).subscribe(
      question =>{
        if(question.id==0){this.pushNotification(alerts ,'danger','Erreur')}
        else{id=question,callback(id),this.pushNotification(alerts ,'success','Ajout avec succées')}},
      err =>{id=0,this.pushNotification(alerts ,'danger','Erreur'+err)  },
    );
}
  getQuestionsOfExam(id_exam:number,object:String) {
    return this.http.get<Question[]> (this.getUrl+"?api_token="+object+"&examen_id="+id_exam);
  }
  getDetailQuestionsOfExam(id_question:number,object:String) {
    return this.http.get(this.getDetailUrl+"?api_token="+object+"&id="+id_question);
  }
  delete(id: number,object:String) {
    return this.http.delete(this.deleteUrl+"?api_token="+object+"&id="+id);
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
}}
