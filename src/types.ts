export type Project = 'coca-cola' | 'burger-king';
export type Status = 'validado' | 'por-confirmar' | 'exemplo';
export type Page = 'inicio' | Project | 'manual-coca-cola' | 'manual-burger-king' | 'triagem' | 'faq' | 'simulacoes' | 'respostas' | 'pesquisa' | 'favoritos' | 'formacao' | 'versoes' | 'seguranca';

export interface CallStep {
  id: string;
  title: string;
  say: string;
  verify: string;
  avoid: string;
  note?: string;
}

export interface Procedure {
  id: string;
  project: Project;
  title: string;
  category: string;
  summary: string;
  aliases: string[];
  status: Status;
  source: string;
  lastValidated: string | null;
  steps: CallStep[];
}

export interface QuizItem {
  id: string;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}
