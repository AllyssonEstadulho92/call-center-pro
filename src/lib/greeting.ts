/** Saudação ajustável manualmente; o relógio do dispositivo serve apenas de sugestão inicial. */
export type Greeting = 'bom dia' | 'boa tarde';

export function getDefaultGreeting(): Greeting {
  return new Date().getHours() < 12 ? 'bom dia' : 'boa tarde';
}

/** Só troca uma saudação existente, sem alterar o restante guião ou inventar conteúdo. */
export function formatGreeting(script: string, greeting: Greeting): string {
  return script.replace(/\b(bom dia|boa tarde)\b/i, (match) =>
    match[0] === match[0].toUpperCase() ? greeting[0].toUpperCase() + greeting.slice(1) : greeting,
  );
}
