import { Component, OnInit } from '@angular/core';
import {Reclamation} from "../../model/reclamations";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReclamationService} from "../../service/reclamation.service";
import {TokenService} from "../../service/token/token.service";

@Component({
  selector: 'app-ajout-reclamation',
  templateUrl: './ajout-reclamation.component.html',
  styleUrls: ['./ajout-reclamation.component.css']
})
export class AjoutReclamationComponent implements OnInit {

  reclamations: Reclamation[] = []

  public ReclamationForm: FormGroup
  api_token
  alerts: any[]

  user_id :number
  sujet:string
  contenu:string

  checked : boolean = false
  constructor(private tokenService:TokenService,private reclamationService: ReclamationService, private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.api_token=this.tokenService.GetTok();

    this.alerts = new Array();

    this.ReclamationForm = this.formbuilder.group({
      sujetReclamation: ['', Validators.compose([Validators.required])],
      detailReclamation: ['', Validators.compose([Validators.required])]
    });
  }

  get ReclamationFormControl() {
    return this.ReclamationForm.controls;
  }

  pushNotification(type: String, msg: String) {
    this.alerts.push({
      type: type,
      msg: msg,
      timeout: 4500
    });
  }

  createReclamation(sujetReclamation,detailReclamation) {
    this.reclamationService.createReclamation(this.api_token, this.sujet, this.contenu).subscribe((response) => {
      this.alerts = new Array();
      this.pushNotification('success', 'Ajout effectué avec succès.');
    })
  }

}
