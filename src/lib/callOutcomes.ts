import type { CallStep, Procedure } from '../types';

/** Esta seleção é manual, transitória e não representa uma validação pelo sistema. */
export type ClosingStatus = 'neutro' | 'confirmado' | 'pendente';

interface ClosingGuidance {
  confirmed: string;
  pending: string;
  confirmedLabel: string;
  pendingLabel: string;
}

const technicalCocaCola = new Set(['cc-sem-funcionar', 'cc-nao-refrigera', 'cc-sem-produto']);

export function getClosingGuidance(procedure: Procedure, step: CallStep): ClosingGuidance | null {
  if (procedure.project === 'coca-cola' && technicalCocaCola.has(procedure.id) && step.id === 'fecho') {
    return {
      confirmed: 'A ocorrência ficou registada no sistema. Posso ajudar em mais alguma questão?',
      pending: 'Neste momento, ainda não tenho confirmação de que a ocorrência tenha ficado registada. Vou consultar o procedimento de apoio aplicável.',
      confirmedLabel: 'Ocorrência registada e confirmada no sistema',
      pendingLabel: 'Ocorrência ainda sem confirmação no sistema',
    };
  }
  if (procedure.id === 'bk-telefone' && step.id === 'final') {
    return {
      confirmed: 'O sistema confirmou o registo da encomenda. Posso ajudar em mais alguma questão?',
      pending: 'Ainda não tenho confirmação de que a encomenda tenha ficado registada. Vou verificar o próximo passo aplicável.',
      confirmedLabel: 'Encomenda registada e confirmada no sistema',
      pendingLabel: 'Encomenda ainda sem confirmação no sistema',
    };
  }
  return null;
}

export function getClosingText(procedure: Procedure, step: CallStep, status: ClosingStatus): string {
  const guidance = getClosingGuidance(procedure, step);
  if (!guidance || status === 'neutro') return step.say;
  return status === 'confirmado' ? guidance.confirmed : guidance.pending;
}
