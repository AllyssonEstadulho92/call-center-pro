import { describe, expect, it } from 'vitest';
import { procedures } from './knowledge';

// Salvaguardas de conteúdo para o repositório público.
describe('qualidade dos guiões', () => {
  it('não duplica identificadores de procedimentos', () => {
    expect(new Set(procedures.map(p => p.id)).size).toBe(procedures.length);
  });
  it('distingue sempre a orientação operacional por validar', () => {
    expect(procedures.every(p => p.status !== 'validado')).toBe(true);
    expect(procedures.every(p => p.source.length > 0 && p.lastValidated === null)).toBe(true);
  });
  it('exige texto e cuidados para cada etapa', () => {
    expect(procedures.every(p => p.steps.length >= 3 && p.steps.every(s => s.title && s.say && s.verify && s.avoid))).toBe(true);
  });
  it('oferece conteúdos dos dois serviços', () => {
    expect(procedures.some(p => p.project === 'burger-king')).toBe(true);
    expect(procedures.some(p => p.project === 'coca-cola')).toBe(true);
  });
});

describe('salvaguardas de comunicação para auditoria de chamadas', () => {
  it('exige identificação do equipamento e contacto condicional nos três guiões técnicos principais', () => {
    for (const id of ['cc-sem-funcionar', 'cc-nao-refrigera', 'cc-sem-produto']) {
      const procedure = procedures.find(p => p.id === id);
      expect(procedure).toBeDefined();
      expect(procedure!.steps.map(s => s.id)).toEqual([
        'abertura', 'identificacao', 'morada', 'equipamento', 'problema',
        ...((id === 'cc-sem-funcionar') ? ['seguranca'] : [id === 'cc-nao-refrigera' ? 'observacao' : 'alcance']),
        'contacto', 'fecho',
      ]);
      expect(procedure!.steps.find(s => s.id === 'contacto')!.verify).toMatch(/primeiro quais os dados/);
      expect(procedure!.steps.find(s => s.id === 'equipamento')!.avoid).toMatch(/não pedir ao cliente/i);
    }
  });

  it('não considera concluído um registo que ainda não foi confirmado', () => {
    for (const p of procedures.filter(p => ['cc-sem-funcionar', 'cc-nao-refrigera', 'cc-sem-produto'].includes(p.id))) {
      const closing = p.steps.find(s => s.id === 'fecho')!;
      expect(closing.say).toMatch(/verificar no sistema o estado do registo/);
      expect(closing.note).toMatch(/Se o sistema confirmar o registo/);
      expect(closing.note).toMatch(/Se continuar pendente/);
      expect(closing.avoid).toMatch(/não garantir registo/i);
    }
  });

  it('não declara resolução impossível, reembolso ou encomenda concluída sem verificação', () => {
    const digital = procedures.find(p => p.id === 'bk-app')!;
    expect(digital.steps.find(s => s.id === 'fecho')!.say).not.toMatch(/não conseguir resolver diretamente/);
    const telephone = procedures.find(p => p.id === 'bk-telefone')!;
    expect(telephone.steps.find(s => s.id === 'final')!.say).toMatch(/verificar no sistema.*confirmar o resultado/);
    expect(procedures.every(p => p.status !== 'validado' && p.lastValidated === null)).toBe(true);
  });
});

describe('fecho adequado à natureza do contacto', () => {
  it('não pressupõe registo de avaria em pedidos comerciais, consumidor e triagem geral', () => {
    for (const id of ['cc-falta-produto', 'cc-limpeza', 'cc-outras', 'cc-consumidor', 'cc-comercial']) {
      const procedure = procedures.find(p => p.id === id)!;
      const closing = procedure.steps.find(step => step.id === 'fecho')!;
      expect(closing.title).toBe('Encerramento sem assumir registo');
      expect(closing.say).not.toMatch(/estado do registo|a ocorrência ficou registada/i);
      expect(closing.avoid).toMatch(/Não afirmar que houve abertura/);
    }
  });
  it('preserva o fecho dependente de confirmação nas três avarias técnicas', () => {
    for (const id of ['cc-sem-funcionar', 'cc-nao-refrigera', 'cc-sem-produto']) {
      expect(procedures.find(p => p.id === id)!.steps.at(-1)?.title).toBe('Confirmar resultado antes de encerrar');
    }
  });
});
