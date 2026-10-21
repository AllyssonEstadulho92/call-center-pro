import { describe, expect, it } from 'vitest';
import { procedures } from '../data/knowledge';
import { getClosingGuidance, getClosingText } from './callOutcomes';

describe('fecho condicionado à verificação no sistema oficial', () => {
  it('começa neutro e só altera mediante escolha explícita', () => {
    for (const id of ['cc-sem-funcionar', 'cc-nao-refrigera', 'cc-sem-produto', 'bk-telefone']) {
      const procedure = procedures.find(p => p.id === id)!;
      const step = procedure.steps[procedure.steps.length - 1];
      expect(getClosingGuidance(procedure, step)).not.toBeNull();
      expect(getClosingText(procedure, step, 'neutro')).toBe(step.say);
      expect(getClosingText(procedure, step, 'confirmado')).toMatch(/(registada|registo da encomenda)/);
      expect(getClosingText(procedure, step, 'pendente')).toMatch(/ainda não tenho confirmação/i);
    }
  });
  it('não induz registos confirmados para procedimentos fora do âmbito', () => {
    for (const id of ['cc-consumidor', 'cc-comercial', 'bk-app', 'bk-atraso', 'bk-incompleto']) {
      const procedure = procedures.find(p => p.id === id)!;
      const step = procedure.steps[procedure.steps.length - 1];
      expect(getClosingGuidance(procedure, step)).toBeNull();
      expect(getClosingText(procedure, step, 'confirmado')).toBe(step.say);
    }
  });
  it('aplica opções somente na etapa de fecho', () => {
    const procedure = procedures.find(p => p.id === 'cc-sem-funcionar')!;
    expect(procedure.steps.slice(0,-1).every(step => getClosingGuidance(procedure, step) === null)).toBe(true);
  });
});
