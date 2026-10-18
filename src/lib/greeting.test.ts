import { describe, expect, it } from 'vitest';
import { formatGreeting } from './greeting';

describe('saudações para leitura em direto', () => {
  it('ajusta a abertura Coca-Cola sem alterar o resto da frase', () => {
    expect(formatGreeting('Serviços de Avarias Coca-Cola, bom dia, fala o Allysson.', 'boa tarde'))
      .toBe('Serviços de Avarias Coca-Cola, boa tarde, fala o Allysson.');
  });
  it('permite regressar de boa tarde a bom dia', () => {
    expect(formatGreeting('Burger King em Casa, boa tarde, fala o Allysson.', 'bom dia'))
      .toBe('Burger King em Casa, bom dia, fala o Allysson.');
  });
  it('não altera textos sem saudação', () => {
    const text = 'Vou confirmar a informação no sistema autorizado.';
    expect(formatGreeting(text, 'boa tarde')).toBe(text);
  });
});
