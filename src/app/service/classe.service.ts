import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {Classe} from '../model/classe';
import {Observable} from 'rxjs';
import {Etudiant} from '../model/etudiant';


@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  apiUrl = 'http://127.0.0.1:8000/api/professor/classes';
  affectUrl = 'http://127.0.0.1:8000/api/professor/affect';
   h = new HttpHeaders().append('Content-Type', 'application/json')
    .append('Accept','application/json');
  constructor(private http: HttpClient) { }

  findAll(object:String) {
    return this.http.get<Classe[]> (this.apiUrl+"?api_token="+object);
  }

  persist(classe: Classe,object:String) {
    return this.http.post<Classe>(this.apiUrl+"?api_token="+object, classe);
  }

  affect(id_classe: number, email: String,api_token:String) {
    return this.http.post<Etudiant>(this.affectUrl+"?api_token="+api_token, {id_classe, email});
  }

  delete(id: number,object:String) {
    return this.http.delete(this.apiUrl+"?api_token="+object+"&id="+id);
  }
}
