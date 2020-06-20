export interface ReponseEtudiant {
  id?: number;
  texte?: string;
  url?: File;
  choix?: string;
  note?: number;
  question_id?:number;
  etudiant_id:number;
  choices: String [];
}
