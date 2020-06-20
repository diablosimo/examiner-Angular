import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginServiceService} from "../../service/login-service.service";
import {User} from "../../model/User";
import {PasswordResetService} from "../../service/password-reset.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  public hiddenEmailForm:Boolean;
  public hiddenCodeForm:Boolean;
  public hiddenpPasswordForm:Boolean;

  public emailForm:FormGroup;
  public codeForm:FormGroup;
  public passwordForm:FormGroup;
  private email:any;
  private code:any;
  private password:any;
  private cpassword:any;


  user:any;
  loading: boolean = true;

  alerts: any[] ;

  constructor(private emailBuilder: FormBuilder, private codeBuilder: FormBuilder, private passwordBuilder: FormBuilder, private passwordResetService:PasswordResetService) {
  }
  get emailFormControl() {return this.emailForm.controls;}
  get passwordFormControl() {return this.passwordForm.controls;}
  get codeFormControl() {return this.codeForm.controls;}
  ngOnInit(): void {
    this.hiddenEmailForm=false;
    this.hiddenCodeForm=true;
      this.hiddenpPasswordForm=true;
    let patternsEmail={email: ['', Validators.compose([Validators.required, Validators.email])],};
    let patternsCode={code: ['', Validators.compose([Validators.required, Validators.minLength(4)])],};
    let patternsPass={
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      cpassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    };
    this.emailForm=this.emailBuilder.group(patternsEmail);
    this.codeForm=this.codeBuilder.group(patternsCode);
    this.passwordForm=this.passwordBuilder.group(patternsPass);

  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('cpassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }


  onSubmitEmail() {
    this.alerts=[];
let email
    this.passwordResetService.emailVerifyForReset(this.email,this.alerts,() => {
      this.hiddenEmailForm=true;
      this.hiddenCodeForm=false;
  });

  }

  onSubmitCode() {
    this.alerts=[];
    this.passwordResetService.codeVerifyForReset(this.email,this.code,this.alerts,() => {
      this.hiddenCodeForm=true;
      this.hiddenpPasswordForm=false;
    });
  }

  onSubmitPassword() {
    this.alerts=[];
    this.passwordResetService.passwordVerifyForReset(this.email,this.code,this.password,this.alerts,() => {
      this.hiddenCodeForm=true;
      this.hiddenpPasswordForm=true;
    });

  }
}
