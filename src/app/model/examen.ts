import {Etudiant} from './etudiant';
import {Question} from "./question";

export interface Examen {
  id?: number;
  nom: string;
  date_examen:Date;
  bareme: number;
  seuil_reussite: number;
  classe_id?: string;
  duree:number;
  created_at?: string;
  updated_at?: string;
  questions?: Question [];
  //etudiants?: Etudiant [];
}
