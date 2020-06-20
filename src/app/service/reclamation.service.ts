import { Injectable } from '@angular/core';
import {HandleError, HttpErrorHandler} from "./HttpErrorHandler";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reclamation} from "../model/reclamations";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private handleError: HandleError;
  private url="http://127.0.0.1:8000/"

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError("ReclamationService");
  }


  fetchReclamations(): Observable<Reclamation[]> {
    return this.http
      .get<Reclamation[]>(this.url+"api/reclamation/liste")
      .pipe(catchError(this.handleError("fetchReclamations", [])));
  }


  fetchReclamationsTraite(): Observable<Reclamation[]> {
    return this.http
      .get<Reclamation[]>(this.url+"api/reclamation/listetraite")
      .pipe(catchError(this.handleError("fetchReclamationsTraite", [])));
  }


  fetchReclamationsNonTraite(): Observable<Reclamation[]> {
    return this.http
      .get<Reclamation[]>(this.url+"api/reclamation/listenontraite")
      .pipe(catchError(this.handleError("fetchReclamationsNonTraite", [])));
  }

  fetchReclamationbyid(id: number): Observable<Reclamation> {
    const reclamation = {} as  Reclamation
    return this.http
      .get<Reclamation>(this.url+`api/reclamation/${id}`)
      .pipe(catchError(this.handleError("fetchReclamationbyid", reclamation)));
  }

  updateReclamation(reclamation: Reclamation): Observable<Reclamation>{
    return this.http
      .put<Reclamation>(this.url+`api/reclamation/update`, reclamation)
      .pipe(catchError(this.handleError("updateReclamation", reclamation)));
  }

  createReclamation(api_token : string, sujet: string, contenu : string) : Observable<boolean>{
    return this.http.post<boolean>(this.url+`api/reclamation/create`, {api_token, sujet, contenu});
  }

  deleteReclamation(id : number): Observable<Reclamation> {
    const reclamation = {} as  Reclamation
    return this.http
      .delete<Reclamation>(this.url+`/reclamation/delete/${id}`)
      .pipe(catchError(this.handleError("deleteReclamation", reclamation)));
  }
}
