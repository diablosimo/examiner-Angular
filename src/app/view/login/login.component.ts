import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginServiceService} from "../../service/login-service.service";
import {User} from "../../model/User";
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  router:Router;
  public angForm:FormGroup;
  email:any;
  password;
  alerts: any[] ;


  constructor(private formbuilder: FormBuilder,private loginService:LoginServiceService) { }

  get angFormControl() {
    return this.angForm.controls;
  }
  ngOnInit(): void {
    let patterns={
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
  }
    this.angForm=this.formbuilder.group(patterns);


}

  onSubmit() {
    this.alerts=[];
this.loginService.login(JSON.stringify({ email: this.email, password: this.password }),this.alerts,this.angForm)
  }
}
