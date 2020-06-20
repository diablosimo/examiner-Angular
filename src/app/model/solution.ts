
  export interface Solution {
    id: number;
    texte: string;
    url: string;
    choix: string;
    question_id: number;
    created_at: string;
    updated_at: string;
  }

  export interface Choix {
    id: number;
    numero: number;
    choice: string;
    question_id: number;
    created_at: string;
    updated_at: string;
  }



