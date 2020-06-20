import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/User";
import {LoginServiceService} from "../../service/login-service.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public angForm:FormGroup;
  user:any;
  loading: boolean = true;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  namePattern = "^[a-zA-Z ]{4,25}$";
  pwdPattern = "^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{6,12}$";
  alerts: any[] ;

  constructor(private formbuilder: FormBuilder,private loginService:LoginServiceService
  ) {
    this.user=new User();

  }
  get angFormControl() {
    return this.angForm.controls;
  }

  ngOnInit(): void {
  let patterns={
      email: ['', Validators.compose([Validators.required, Validators.email])],
      nom: ['', Validators.compose([Validators.required, Validators.pattern(this.namePattern)])],
      prenom: ['', Validators.compose([Validators.required, Validators.pattern(this.namePattern)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      cpassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
   inlineradios:['', Validators.compose([Validators.required])],
    };
    this.angForm=this.formbuilder.group(patterns,{validator: this.checkPasswords });
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('cpassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }
  onSubmit() {
    this.alerts=[];
   this.loginService.signUp(JSON.stringify(this.user),this.alerts,this.angForm);

  }

}
