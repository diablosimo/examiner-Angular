import {Component, OnInit} from '@angular/core';
import {Classe} from '../../model/classe';
import {ClasseService} from '../../service/classe.service';
import {Etudiant} from '../../model/etudiant';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenService} from "../../service/token/token.service";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
   api_token:any;
  classes: Classe [] = [];
  newClasse: Classe = {nom: ''};
  resultFilter: Classe [] = [];
  public angForm: FormGroup;
  email: String = '';
  idClasse: number;
  listEtudiant: Etudiant [] = [];
  searchText: '';
  alerts: any[];
  public addClassForm: FormGroup;


  constructor(private tokenService: TokenService,private classeService: ClasseService, private formbuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.api_token=this.tokenService.GetTok();

    this.getclasses();
    const patterns = {
      email: ['', Validators.compose([Validators.required, Validators.email])],
      idClasse: ['', Validators.compose([Validators.required])],
    };
    const patterns2 = {
      nomClasse: ['', Validators.compose([Validators.required])]
    };
    this.angForm = this.formbuilder.group(patterns);
    this.addClassForm = this.formbuilder.group(patterns2);
    this.alerts = new Array();
  }

  get angFormControl() {
    return this.angForm.controls;
  }

  get addClassFormControl() {
    return this.addClassForm.controls;
  }

  getclasses() {
    this.classeService.findAll(this.api_token)
      .subscribe(classes => {
        this.classes = classes;
        this.resultFilter = classes;
      });
  }

  persistClasse() {
    // tslint:disable-next-line:triple-equals
    if (this.newClasse.nom != '') {
      this.classeService.persist(this.newClasse,this.api_token).subscribe((classe) => {
        this.classes = [classe, ...this.classes];
        this.resultFilter = this.classes;
        this.resetClasse();
        this.alerts = new Array();
        this.pushNotification('success', 'Ajout de classe avec succes');
      });
    } else {
    }
  }

  pushNotification(type: String, msg: String) {
    this.alerts.push({
      type: type,
      msg: msg,
      timeout: 4500
    });
  }

  private resetClasse() {
    this.newClasse = {nom: ''};
  }

  private resetAffectation() {
    this.idClasse = 0;
    this.email = '';
  }

  private resetListEtudiant() {
    this.listEtudiant = [];
  }

  affectEtudiant() {
    if (this.email !== '' && this.idClasse !== 0) {
      this.classeService.affect(this.idClasse, this.email,this.api_token).subscribe((response) => {
        // tslint:disable-next-line:triple-equals
        this.alerts = new Array();
        if (response[0] === 1) {
          this.showUpdatedItem(this.classes, response[1]);
          this.showUpdatedItem(this.resultFilter, response[1]);
          this.resetAffectation();
          this.pushNotification('success', 'Affectation avec succès.');
        } else if (response[0] === -1) {
          this.pushNotification('danger', 'L\'étudiant introuvable.');
        } else if (response[0] === -2) {
          this.pushNotification('warning', 'L\'étudiant a été déjà affecté.');
        }
      });
    }
  }

  showEtudiants(classe: Classe) {
    this.resetListEtudiant();
    this.listEtudiant = classe.etudiants;
  }

  showUpdatedItem(classes: Classe[], newItem) {
    const updateItem = classes.find(this.findIndexToUpdate, newItem.id);
    const index = classes.indexOf(updateItem);
    classes[index] = newItem;

  }

  findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  updateListEtudiant(id_classe: number, etudiant: Etudiant) {
    // tslint:disable-next-line:triple-equals
    this.classes.find(x => x.id === id_classe).etudiants.push(etudiant);
    this.resultFilter.find(x => x.id === id_classe).etudiants.push(etudiant);
  }

  searchClasses() {
    this.resultFilter = this.classes.filter((classe) => classe.nom.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));
  }

  deleteClasse(id: number) {
    if (this.listEtudiant.length === 0) {
      this.classeService.delete(id,this.api_token).subscribe(() => {
        this.classes = this.classes.filter(classe => classe.id !== id);
        this.resultFilter = this.classes.filter(classe => classe.id !== id);
        this.pushNotification('success', 'Suppression avec succès.');
      });
    } else {
      this.pushNotification('warning', 'Cette classe contient des etudiants affectés, impossible de la supprimer');

    }
  }

  onSubmit() {
    this.affectEtudiant();
  }
}

