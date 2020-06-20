  import { Injectable } from '@angular/core';
  import {HttpClient, HttpHeaders} from "@angular/common/http";
  import {Router} from "@angular/router";
  import {FormGroup} from "@angular/forms";

  @Injectable({
  providedIn: 'root'
  })
  export class PasswordResetService {

  constructor(private router: Router,private http: HttpClient) { }

  emailVerifyForReset(email,alerts,callback){

    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Accept','application/json');

    this.http.post("http://127.0.0.1:8000/api/emailVerifyForReset", JSON.stringify(({ email: email })), { headers: headers }).

    subscribe(
      res => {
        if(res[0]==-1){
  this.alerting(alerts,'danger','Votre recherche ne donne aucun résultat.',8000);
        }
        else if(res[0]==1){
          this.alerting(alerts,'success','Vérifiez votre email et entrez le code',8000);

          callback();
        }

    }
    );}
    codeVerifyForReset(email,code,alerts,callback){

      let headers = new HttpHeaders().append('Content-Type', 'application/json')
        .append('Accept','application/json');

      this.http.post("http://127.0.0.1:8000/api/codeVerifyForReset", JSON.stringify(({ email: email ,codeVerification: code})), { headers: headers }).

      subscribe(
        res => {
          if(res==-1){
            this.alerting(alerts,'danger','le code nest pas correct',8000);
          }
          else if(res==1){
            this.alerting(alerts,'success','changer votre mot de passe',8000);

            callback();
          }

        }
      );}

    passwordVerifyForReset(email,code,password,alerts,callback){

      let headers = new HttpHeaders().append('Content-Type', 'application/json')
        .append('Accept','application/json');

      this.http.post("http://127.0.0.1:8000/api/passwordVerifyForReset", JSON.stringify(({ email: email ,codeVerification: code,password:password})), { headers: headers }).

      subscribe(
        res => {
          if(res[0]==1){
            this.alerting(alerts,'success',res[1],18000);
            callback();

          }
          else {
            this.alerting(alerts,'danger',res[1],8000);

          }

        }
      );}

  alerting(alerts,type,msg,time){
    alerts.push({
      type: type,
      msg: msg,
      timeout: time,
    });
          }  }
