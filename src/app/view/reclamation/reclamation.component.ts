import { Component, OnInit } from '@angular/core'

import { Reclamation } from '../../model/reclamations'
import { ReclamationService } from '../../service/reclamation.service'
import {FormBuilder,  FormControl, FormGroup, Validators} from '@angular/forms';
import {Professeur} from "../../model/professeurs";
import {ProfesseurService} from "../../service/professeur.service";

@Component({
  selector: 'app-reclamations',//<app-reclamations></app-reclamations>
  templateUrl: './reclamations.component.html',
  providers: [ReclamationService]
})

export class ReclamationsComponent implements OnInit {
  reclamations: Reclamation[] = []
  reclamation: Reclamation

  public ModifReclamationForm: FormGroup

  alerts: any[]
  professeurs: Professeur[] = [];

  checked : boolean = false
  constructor(private professeurService: ProfesseurService,private reclamationService: ReclamationService, private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.fetchReclamations()
    this.fetchProfesseurs()
    this.reclamation = new Reclamation()
    this.alerts = new Array();

    this.ModifReclamationForm = this.formbuilder.group({
      reponse: ['', Validators.compose([Validators.required])],
      });
  }

  get ModifReclamationFormControl() {
    return this.ModifReclamationForm.controls;
  }

  pushNotification(type: String, msg: String) {
    this.alerts.push({
      type: type,
      msg: msg,
      timeout: 4500
    });
  }

  fetchReclamations(): void {
    this.reclamationService.fetchReclamations().subscribe(reclamations => (
      this.reclamations = reclamations))
  }

 /* fetchReclamationsTraite(): void {
    this.reclamationService.fetchReclamationsTraite().subscribe(reclamations => {this.reclamations = reclamations; this.reclamations = [...this.reclamations];})
  }*/

  fetchReclamationsNonTraite(): void {
    this.reclamationService.fetchReclamationsNonTraite().subscribe(reclamations => {
        this.reclamations = reclamations;
  //  this.reclamations = [...this.reclamations];
    })
  }

  checkedChange():void{
    if(!this.checked)
      this.fetchReclamations();
    else
      this.fetchReclamationsNonTraite();
  }

  clicked(reclamation):void{
    this.reclamation = reclamation
  }

  updateReclamation():void{
    this.reclamationService.updateReclamation(this.reclamation).subscribe((response) => {
      console.log(response);

      this.alerts = new Array();
      this.pushNotification('success', 'Modification effectué avec succès.');
    })
  }




  fetchProfesseurs(): void {
    this.professeurService.fetchProfesseurs().subscribe(professeurs => (this.professeurs = professeurs))
  }

}


