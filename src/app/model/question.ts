import {Choice} from "./choice";

export interface Question {
  reponseDisponible?: boolean;
  id?: number;
  contenu?: string;
  type_question?:string;
  note?: number;
  numero?: number;
  examen_id?: number;
  reponse?:string;
  //////QCM////////
  nbReponse?:number;
  reponse1?:string;
  reponse2?:string;
  reponse3?:string;
  reponse4?:string;
  choices?: Choice[];

}
