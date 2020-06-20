import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {LoginServiceService} from "../../service/login-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-verificationcode',
  templateUrl: './verificationcode.component.html',
  styleUrls: ['./verificationcode.component.css']
})
export class VerificationcodeComponent implements OnInit {
  api_token: String;
  email: any;
  alerts:any[];
  public angForm:FormGroup;
  codeVerification:any;
  hide: Boolean=false;
  constructor(private formbuilder: FormBuilder,private loginService:LoginServiceService,  private route: ActivatedRoute) { }
  get angFormControl() {
    return this.angForm.controls;
  }
  ngOnInit(): void {
    this.api_token=this.route.snapshot.paramMap.get('token').toString();
   this.loginService.testUserToken(this.api_token);
    let patterns={
      codeVerification: ['', Validators.compose([Validators.required, Validators.minLength(4)])],

    }
    this.angForm=this.formbuilder.group(patterns);
  }
  onSubmit() {
    this.alerts=[];
    this.loginService.verifyAccount( JSON.stringify({ api_token: this.api_token, codeVerification: this.codeVerification, }),
      this.alerts,this.angForm,() => {
      this.hide=true;
    });

  }

}
