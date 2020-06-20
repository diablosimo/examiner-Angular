import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import { catchError } from 'rxjs/operators';
import {throwError} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Token} from "@angular/compiler";
import {TokenService} from "./token/token.service";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class LoginServiceService {

  constructor(private tokenService:TokenService,private router: Router,private http: HttpClient) {

  }
  signUp(object,alerts,angForm:FormGroup){

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post("http://127.0.0.1:8000/api/register", object, { headers: headers }).subscribe(
       res => {
        const response = res.toString();
        if(res==1){
          alerts.push({
            type: 'success',
            msg: `inscription validé veuillez  se connectez et confirmez votre mail`,
            timeout: 4500
          });

          this.router.navigateByUrl('/login');

        }
        else {
          alerts.push({
            type: 'danger',
            msg: res,
            timeout: 4500
          });

          angForm.reset();
        }
      }
    );
  }
  verifyAccount(object,alerts,angForm:FormGroup,callback){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post("http://127.0.0.1:8000/api/verifiyAccount", object, { headers: headers }).subscribe(
      res => {
        const response = res.toString();
        if(res[0]==1){
          alerts.push({
            type: 'success',
            msg: `Vérification validé veuillez se connecter`,
            timeout: 50000000
          });
callback()
        }
        else if(res[0]==-1){
          alerts.push({
            type: 'danger',
            msg: `code invalide`,
            timeout: 5000
          });
          angForm.reset();
        }
      }
    );
  }
  testUserToken(token){

    let headers = new HttpHeaders().append('Content-Type', 'application/json')
    .append('Accept','application/json');

    this.http.post("http://127.0.0.1:8000/api/testUserToken", JSON.stringify(({ api_token: token })), { headers: headers }).

    subscribe(
      res => {
        if(res[0]==-1){
          this.router.navigateByUrl('/404');
          return "";
        }

      }

    );
  }
  login(object,alerts,angForm:FormGroup){

    let headers=new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post("http://127.0.0.1:8000/api/login", object, { headers: headers }).subscribe(
      res => {
        if(res[0]==-3){
          alerts.push({
            type: 'danger',
            msg: `Combinaison de Email/password incorrecte`,
            timeout: 5000
          });
          angForm.reset();
        }
        else if (res[0]==-2){
          this.router.navigate(['/verificationcode',res[1]]);
        }
        else if (res[0]==1){
          this.tokenService.SetTok(res[1]);

          if( res[2]==="professeur")
          this.router.navigate(['/p'],res[1]);
          else this.router.navigate(['/e'],res[1]);
        }
      }
    );
  }
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
