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
