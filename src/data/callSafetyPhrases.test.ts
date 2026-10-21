import { describe, expect, it } from 'vitest';
import { callSafetyPhrases } from './callSafetyPhrases';

describe('frases de apoio para dúvidas do cliente', () => {
  it('abrange ambos os serviços com opções distintas e texto completo', () => {
    for (const project of ['coca-cola', 'burger-king'] as const) {
      const phrases = callSafetyPhrases[project];
      expect(phrases).toHaveLength(4);
      expect(new Set(phrases.map(item => item.id)).size).toBe(phrases.length);
      expect(phrases.every(item => item.question.length > 10 && item.say.length > 30 && item.verify.length > 40)).toBe(true);
    }
  });
  it('não promete reembolsos, visitas, registos nem prazos sem confirmação', () => {
    for (const phrase of [...callSafetyPhrases['coca-cola'], ...callSafetyPhrases['burger-king']]) {
      expect(phrase.say).not.toMatch(/garanto|será reembolsado|já ficou registad[oa]|vai chegar amanhã|o técnico irá amanhã/i);
      expect(phrase.say).not.toMatch(/\b\d{9}\b/);
    }
  });
});
