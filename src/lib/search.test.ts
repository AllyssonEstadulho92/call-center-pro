import { describe, expect, it } from 'vitest';
import { procedures } from '../data/knowledge';
import { normalize, searchProcedures } from './search';

describe('pesquisa e segurança da base inicial', () => {
  it('ignora maiúsculas e acentos', () => {
    expect(normalize('REFRIGERAÇÃO')).toBe('refrigeracao');
  });
  it('encontra expressões usadas por clientes', () => {
    expect(searchProcedures(procedures, 'não faz frio').some((item) => item.id === 'cc-nao-refrigera')).toBe(true);
  });
  it('separa as duas áreas de trabalho', () => {
    expect(searchProcedures(procedures, '', 'burger-king').every((item) => item.project === 'burger-king')).toBe(true);
  });
  it('não marca conteúdos iniciais como validados sem fonte oficial', () => {
    expect(procedures.every((item) => item.status !== 'validado' && item.lastValidated === null)).toBe(true);
  });
  it('exige pelo menos quatro passos por procedimento', () => {
    expect(procedures.every((item) => item.steps.length >= 4)).toBe(true);
  });
});
