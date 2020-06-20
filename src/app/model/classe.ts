import {Etudiant} from './etudiant';
import {Examen} from "./examen";

export interface Classe {
  id?: number;
  nom: string;
  created_at?: string;
  updated_at?: string;
  professeur_id?: number;
  etudiants?: Etudiant [];
  examens?: Examen[];

}
