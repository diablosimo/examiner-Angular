import { Component, OnInit } from '@angular/core'

import { Etudiant } from './etudiants'
import { EtudiantService } from '../../service/etudiant.service'
import {FormBuilder,  FormControl, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TokenService} from "../../service/token/token.service";

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  providers: [EtudiantService]
})

export class EtudiantsComponent implements OnInit {
  etudiants: Etudiant[] = []
  etudiant: Etudiant = new Etudiant()
  voldPassword:string
  vnewPassword:string

  public ModifForm: FormGroup;
  public PasswordForm: FormGroup;
  alerts: any[];
private api_token:any;

  error_messages = {
    'oldPassword': [
      { type: 'required', message: 'Old password is required.' }
    ],
    'newPassword': [
      { type: 'required', message: 'New password is required.' },
      { type: 'minlength', message: 'password should be at least 6 caracters.' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'Confirmation is required.' }
    ],
  }

  constructor(private tokenService:TokenService,private etudiantService: EtudiantService, private formbuilder: FormBuilder) {}

  ngOnInit() {
this.api_token=this.tokenService.GetTok();
    this.fetchEtudiantbyid(this.api_token);

    this.alerts = new Array();

    this.ModifForm = this.formbuilder.group({
      nomEtudiant: ['', Validators.compose([Validators.required])],
      prenomEtudiant: ['', Validators.compose([Validators.required])]
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

  fetchEtudiantbyid(api_token): void {
    this.etudiantService.fetchEtudiantbyid(api_token).subscribe(etudiant => (
      this.etudiant = etudiant)
    )
  }

  pushNotification(type: String, msg: String) {
    this.alerts.push({
      type: type,
      msg: msg,
      timeout: 4500
    });
  }

  edit() {
    this.etudiantService.updateEtudiant(this.etudiant).subscribe((response) => {
      this.alerts = new Array();
      this.pushNotification('success', 'Modification effectué avec succès.');
    })
  }

  editPassword() {
    this.etudiantService.changePassword(this.etudiant.user_id,this.voldPassword, this.vnewPassword).subscribe((response) => {
      this.alerts = new Array();
      if (response === true) {
        this.PasswordForm.reset()
        this.pushNotification('success', 'Modification du mot de passe effectué avec succès.');
      } else if (response === false) {
        this.pushNotification('danger', 'Erreur.');
      }
    })
  }

}


