import { Component, OnInit } from '@angular/core'

import { Professeur } from '../../model/professeurs'
import { ProfesseurService } from '../../service/professeur.service'
import {FormBuilder,  FormControl, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TokenService} from "../../service/token/token.service";

@Component({
  selector: 'app-professeurs',
  templateUrl: './professeurs.component.html',
  providers: [ProfesseurService]
})

export class ProfesseursComponent implements OnInit {
  professeurs: Professeur[] = []
  professeur: Professeur = new Professeur()
  voldPassword:string
  vnewPassword:string
  private api_token:any;


  public ModifForm: FormGroup;
  public PasswordForm: FormGroup;
  alerts: any[];


  error_messages = {
    'oldPassword': [
      { type: 'required', message: 'L\'ancien mot de passe est requis.' }
    ],
    'newPassword': [
      { type: 'required', message: 'Le nouveau mot de passe est requis.' },
      { type: 'minlength', message: 'le mot de passe doit au moin être 6 caractères' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'Confirmation est requise.' }
    ],
  }

  constructor(private tokenService:TokenService,private professeurService: ProfesseurService, private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.api_token=this.tokenService.GetTok();
    this.fetchProfesseurbyid(this.api_token);
    this.alerts = new Array();

    this.ModifForm = this.formbuilder.group({
      nomProfesseur: ['', Validators.compose([Validators.required])],
      prenomProfesseur: ['', Validators.compose([Validators.required])]
    });

    this.PasswordForm = this.formbuilder.group({
      oldPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      newPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required
      ])),
    }, { validators: this.passwordConforme.bind(this)});

  }

  passwordSame(formGroup: FormGroup) {
    const { value: newPassword } = formGroup.get('newPassword');
    const { value: oldPassword } = formGroup.get('oldPassword');
    return newPassword === oldPassword ? null : { passwordSame: true };
  }

  passwordConforme(formGroup: FormGroup) {
    const { value: newPassword } = formGroup.get('newPassword');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return newPassword === confirmPassword ? null : { passwordNotMatch: true };
  }

  get modifFormControl() {
    return this.ModifForm.controls;
  }

  fetchProfesseurbyid(api_token: string): void {
    this.professeurService.fetchProfesseurbyid(api_token).subscribe(professeur => (this.professeur = professeur))
  }

  pushNotification(type: String, msg: String) {
    this.alerts.push({
      type: type,
      msg: msg,
      timeout: 4500
    });
  }

  edit() {
      this.professeurService.updateProfesseur(this.professeur).subscribe((response) => {
      this.alerts = new Array();
      this.pushNotification('success', 'Modification effectué avec succès.');
    })
  }

  editPassword() {
    this.professeurService.changePassword(this.professeur.user_id,this.voldPassword, this.vnewPassword).subscribe((response) => {
      console.log(response);
      this.alerts = new Array();
      if (response === true) {
        this.pushNotification('success', 'Modification du mot de passe effectué avec succès.');
      } else if (response === false) {
        this.pushNotification('danger', 'Erreur.');
      }
    })
  }

}
export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }  }  }



