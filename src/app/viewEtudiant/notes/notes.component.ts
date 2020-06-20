import { Component, OnInit } from '@angular/core';
import {Note} from '../../model/notes';
import {NotesService} from '../../service/etudiant/notes.service';
import {TokenService} from "../../service/token/token.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[]=[];
  apiToken;

  constructor(private tokenService:TokenService,private noteService:NotesService) { }

  ngOnInit(): void {
    this.apiToken=this.tokenService.GetTok();
    this.loadNotes(this.apiToken);
  }

  loadNotes(apiToken){
    this.noteService.loadReponses(this.apiToken).subscribe(reponse => {
      if ( reponse[0] === 1) {
        this.notes = reponse[1];
      }
    });
  }

  reusite(note: number, seuil_reussite: number) {
    if (note>=seuil_reussite){
      return [true,'Vous avez réussi.'];
    }else {
      return [false,'vous avez echoué.'];
    }
  }

  toArray(o: object) {
    return Object.keys(o).map(key => o[key])
  }
}
