import { Injectable } from '@angular/core';
import {Classe} from '../model/classe';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  apiUrl = 'http://127.0.0.1:8000/api/professor/charts';


  constructor(private http: HttpClient) { }

  getClasses(apiToken: string) {
    return this.http.get<[number,Classe[]]> (this.apiUrl+"/classes?api_token="+apiToken);
  }

  loadMeanMarkOfClassByExam(idClass: number, apiToken: string) {
    return this.http.get<[number,string[],number[]]> (this.apiUrl+"/meanmarkbyexam?api_token="+apiToken+"&class_id="+idClass);

  }

  loadNumberOfExamsByClass(apiToken: string) {
    return this.http.get<[number,string[],number[]]> (this.apiUrl+"/nb_exams_per_class?api_token="+apiToken);
  }

  loadNumberOfStudentsByClass(apiToken: string) {
    return this.http.get<[number,string[],number[]]> (this.apiUrl+"/nb_std_per_class?api_token="+apiToken);
  }

  loadNotesByExam(apiToken: string) {
    return this.http.get<[number,string[],number[]]> (this.apiUrl+"/note_std_per_exam?api_token="+apiToken);

  }
}
