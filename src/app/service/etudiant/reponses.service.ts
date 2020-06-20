import { Injectable } from '@angular/core';
import {Etudiant} from '../../model/etudiant';
import {HttpClient} from '@angular/common/http';
import {Classe} from '../../model/classe';
import {QuestionReponse} from '../../model/question-reponse';

@Injectable({
  providedIn: 'root'
})
export class ReponsesService {
  apiUrl = 'http://127.0.0.1:8000/api/etudiant/reponses/examens';
  constructor(private http: HttpClient) { }

  loadClassesWithExams(apiToken: string) {
    return this.http.get<[number,Classe[]]>(this.apiUrl +`?api_token=${apiToken}`);
  }

  loadReponses(id: number,apiToken:String) {
    return this.http.get<[number,QuestionReponse[]]>(this.apiUrl +`/examen?api_token=${apiToken}&eid=${id}`);
  }
}
