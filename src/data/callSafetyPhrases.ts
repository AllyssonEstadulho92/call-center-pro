import type { Project } from '../types';

/** Frases de comunicação prudente para treino, sem aprovação operacional. */
export interface CallSafetyPhrase {
  id: string;
  question: string;
  say: string;
  verify: string;
}

export const callSafetyPhrases: Record<Project, readonly CallSafetyPhrase[]> = {
  'coca-cola': [
    {
      id: 'confirmacao',
      question: 'O pedido ficou registado?',
      say: 'Vou confirmar no sistema se a ocorrência ficou registada. Só depois lhe posso dar essa informação.',
      verify: 'Confirmar o estado real na ferramenta oficial. Se não houver confirmação, consultar o procedimento de apoio.',
    },
    {
      id: 'prazo',
      question: 'Quando vem o técnico?',
      say: 'Neste momento não tenho um prazo de assistência confirmado para lhe indicar. Vou consultar a informação disponível antes de lhe responder.',
      verify: 'Não indicar visitas nem prazos sem confirmação no procedimento ou sistema autorizado.',
    },
    {
      id: 'visita',
      question: 'Pode garantir a assistência?',
      say: 'Para confirmar uma deslocação técnica, preciso primeiro de verificar o encaminhamento aplicável a esta ocorrência.',
      verify: 'Consultar apenas os canais autorizados. Não confirmar uma visita sem evidência.',
    },
    {
      id: 'bloqueio',
      question: 'O sistema não permite concluir?',
      say: 'Neste momento ainda não tenho confirmação da conclusão do registo. Preciso de verificar o procedimento aplicável antes de lhe indicar o próximo passo.',
      verify: 'Consultar as instruções internas e solicitar apoio pelo canal autorizado. Não indicar regras de piquete, região ou prazos não validados.',
    },
  ],
  'burger-king': [
    {
      id: 'reembolso',
      question: 'Quero um reembolso.',
      say: 'Compreendo o seu pedido. Vou verificar qual é o procedimento aplicável. Não consigo confirmar um reembolso sem essa validação.',
      verify: 'Confirmar canal, regras e permissões reais. Nunca garantir compensações sem autorização.',
    },
    {
      id: 'entrega',
      question: 'Quando chega a encomenda?',
      say: 'Compreendo a sua preocupação. Vou confirmar que informação está disponível nesta linha antes de lhe indicar uma previsão.',
      verify: 'Não atribuir localização ao estafeta nem inventar prazos de entrega.',
    },
    {
      id: 'pedido',
      question: 'O pedido não aparece.',
      say: 'Vamos primeiro confirmar em que canal realizou a encomenda. Depois verifico qual o procedimento de apoio aplicável.',
      verify: 'Não diagnosticar pagamentos, autorizações bancárias ou estado do pedido sem acesso confirmado.',
    },
    {
      id: 'reclamacao',
      question: 'Quero reclamar.',
      say: 'Compreendo a sua insatisfação. Pode explicar-me o que aconteceu? Vou confirmar qual é o encaminhamento adequado ao seu caso.',
      verify: 'Ouvir a ocorrência, confirmar as opções autorizadas e não impedir o exercício dos direitos do cliente.',
    },
  ],
};
