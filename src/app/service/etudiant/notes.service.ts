import { Injectable } from '@angular/core';
import {QuestionReponse} from '../../model/question-reponse';
import {HttpClient} from '@angular/common/http';
import {Note} from '../../model/notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  apiUrl = 'http://127.0.0.1:8000/api/etudiant/notes';

  constructor(private http: HttpClient) { }

  loadReponses(apiToken:String) {
    return this.http.get<[number,Note[]]>(this.apiUrl +`?api_token=${apiToken}`);
  }
}
