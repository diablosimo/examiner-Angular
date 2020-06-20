import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Etudiant } from '../viewEtudiant/etudiants/etudiants';
import { HttpErrorHandler, HandleError } from './HttpErrorHandler';

@Injectable()
export class EtudiantService {
  private handleError: HandleError;
private url = 'http://127.0.0.1:8000/';
  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('EtudiantService');
  }


  fetchEtudiants(): Observable<Etudiant[]> {
    return this.http
      .get<Etudiant[]>(this.url + 'api/etudiant/liste')
      .pipe(catchError(this.handleError('fetchEtudiants', [])));
  }

  fetchEtudiantbyid(api_token: string): Observable<Etudiant> {
    const etudiant = {} as  Etudiant;
    return this.http
      .get<Etudiant>(this.url + 'api/etudiant' + '?api_token=' + api_token)
      .pipe(catchError(this.handleError('fetchEtudiantbyid', etudiant)));
  }
  updateEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http
      .put<Etudiant>(this.url + `api/etudiant/update`, etudiant)
      .pipe(catchError(this.handleError('updateEtudiant', etudiant)));
  }

  changePassword(id: number, oldPassword: string, newPassword: string): Observable<boolean>{
    return this.http.put<boolean>(this.url + `api/user/update/password`, {id, oldPassword, newPassword});
  }
}

