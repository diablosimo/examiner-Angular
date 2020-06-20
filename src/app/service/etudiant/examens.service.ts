import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Examen} from '../../model/examen';
import {ReponseEtudiant} from '../../model/reponse-etudiant';
import {Classe} from '../../model/classe';
import {map} from 'rxjs/operators';
import {Etudiant} from '../../model/etudiant';

@Injectable({
  providedIn: 'root'
})
export class ExamensService {
  apiUrl = 'http://127.0.0.1:8000/api/etudiant/';

  constructor(private http: HttpClient) {
  }

  findFutureExamens(apiToken: String) {
    return this.http.get<Etudiant>(this.apiUrl + 'examens?api_token=' + apiToken);
  }

  loadExamQuestions(id: number, apiToken: String) {
    return this.http.get<Examen>(this.apiUrl + 'examen?id=' + id + '&api_token=' + apiToken);
  }

  sendAnswers(reponses: ReponseEtudiant[], apiToken: String, examId: number) {
    return this.http.post<String[]>(this.apiUrl + 'reponses' + '?api_token=' + apiToken + '&examen_id=' + examId, reponses);
  }


}
