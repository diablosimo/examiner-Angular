import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { Professeur } from "../model/professeurs";
import { HttpErrorHandler, HandleError } from "./HttpErrorHandler";
@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {
  private handleError: HandleError;
  private url="http://127.0.0.1:8000/"

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError("ProfesseurService");
  }
  fetchProfesseurs(): Observable<Professeur[]> {
    return this.http
      .get<Professeur[]>(this.url+"api/professeur/liste")
      .pipe(catchError(this.handleError("fetchProfesseurs", [])));
  }

  fetchProfesseurbyid(api_token: string): Observable<Professeur> {
    const professeur = {} as  Professeur
    return this.http
      .get<Professeur>(this.url+'api/professeur'+"?api_token="+api_token)
      .pipe(catchError(this.handleError("fetchProfesseurbyid", professeur)));
  }
  updateProfesseur(professeur: Professeur): Observable<Professeur> {
    return this.http
      .put<Professeur>(this.url+`api/professeur/update`, professeur)
      .pipe(catchError(this.handleError("updateProfesseur", professeur)));
  }

  changePassword(id : number,oldPassword: string,newPassword : string) : Observable<boolean>{
    return this.http.put<boolean>(this.url+`api/user/update/password`, {id, oldPassword, newPassword});
  }
}
