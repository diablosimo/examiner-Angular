import {Injectable} from '@angular/core';

@Injectable()
export class User {
  public id: string ;
  public nom: string ;
  public prenom: string ;
  public email: string ;
  public password: string ;
  public type: string ;

  constructor() {
    this.nom = "";
    this.prenom = "";
    this.email ="";
    this.password ="" ;
    this.type="";
  }}
export interface UserModification{
  id: number
  newPassword: string
  oldPassword: string
}
