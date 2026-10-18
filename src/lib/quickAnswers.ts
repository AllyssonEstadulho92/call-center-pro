import type { CallStep, Procedure } from '../types';

/** Uma frase de apoio é retirada de um guião existente, nunca gerada ou validada automaticamente. */
const preferredIds = [
  'problema', 'motivo', 'tema', 'canal', 'orientacao', 'opcao', 'resposta',
  'documento', 'descricao', 'observacao',
];

const excludedIds = new Set(['abertura', 'identificacao', 'morada', 'fecho', 'final', 'contacto', 'local']);

export function findQuickStep(procedure: Procedure): CallStep {
  for (const id of preferredIds) {
    const step = procedure.steps.find(item => item.id === id);
    if (step) return step;
  }
  return procedure.steps.find(step => !excludedIds.has(step.id)) ?? procedure.steps[0];
}
