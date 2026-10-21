import { test, expect } from '@playwright/test';

async function goToManual(page: import('@playwright/test').Page, target: 'Manual Coca-Cola' | 'Manual Burger King', mobile: boolean) {
  await page.goto('/app.html');
  if (mobile) await page.getByRole('button', { name: 'Abrir menu' }).click();
  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('button', { name: new RegExp(target) }).click();
}

test('manual Coca-Cola: capítulos, voz e consulta das etapas', async ({ page, isMobile }) => {
  await goToManual(page, 'Manual Coca-Cola', isMobile);
  await expect(page.getByRole('heading', { level: 1, name: 'Manual Coca-Cola' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Um atendimento de cada vez, sem te perderes' })).toBeVisible();
  const chapters = page.getByRole('navigation', { name: 'Capítulos do manual' });
  await chapters.getByRole('button', { name: /Equipamento não refrigera/ }).click();
  await expect(page.getByRole('heading', { level: 2, name: 'Equipamento não refrigera' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ouvir frase em voz portuguesa' })).toBeVisible();
  await page.getByRole('button', { name: /Seguinte/ }).click();
  await expect(page.locator('.manual-chapter-progress span').first()).toHaveText('Etapa 2 de 8');
  await page.getByRole('button', { name: 'Ler guião completo' }).click();
  await expect(page.locator('.manual-step')).toHaveCount(8);
  await expect(page.locator('.manual-steps-region')).toContainText('Identificar equipamento e referência');
  await expect(page.locator('.manual-steps-region')).toContainText('Se continuar pendente');
  await expect(page.getByText(/Não existe validação institucional registada/)).toBeVisible();
});

test('manual Burger King: pesquisa e origem dos procedimentos', async ({ page, isMobile }) => {
  await goToManual(page, 'Manual Burger King', isMobile);
  await expect(page.getByRole('heading', { level: 1, name: 'Manual Burger King' })).toBeVisible();
  const search = page.getByRole('searchbox', { name: 'Pesquisar neste manual' });
  await search.fill('pedido incompleto');
  const chapters = page.getByRole('navigation', { name: 'Capítulos do manual' });
  await expect(chapters.getByRole('button', { name: /Pedido incompleto/ })).toBeVisible();
  await expect(chapters.getByRole('button', { name: /Equipamento não refrigera/ })).toHaveCount(0);
  await chapters.getByRole('button', { name: /Pedido incompleto/ }).click();
  await expect(page.getByRole('heading', { level: 2, name: 'Pedido incompleto' })).toBeVisible();
  await expect(page.getByText(/Por confirmar na operação/)).toBeVisible();
});

test('manual mostra frase de fecho de acordo com escolha e limpa-a ao mudar de assunto', async ({ page, isMobile }) => {
  await goToManual(page, 'Manual Coca-Cola', isMobile);
  const chapters = page.getByRole('navigation', { name: 'Capítulos do manual' });
  await chapters.getByRole('button', { name: /Equipamento não refrigera/ }).click();
  await page.getByRole('button', { name: 'Ler guião completo' }).click();
  const status = page.getByRole('combobox', { name: 'Estado do registo no sistema' });
  await expect(status).toHaveValue('neutro');
  await status.selectOption('confirmado');
  await expect(page.locator('.manual-step').last().locator('blockquote')).toContainText('A ocorrência ficou registada');
  await chapters.getByRole('button', { name: /Equipamento não funciona/ }).click();
  await page.getByRole('button', { name: 'Ler guião completo' }).click();
  await expect(status).toHaveValue('neutro');
});

test('resposta rápida de contingência no manual mantém o capítulo aberto', async ({ page, isMobile }) => {
  await goToManual(page, 'Manual Burger King', isMobile);
  const chapters = page.getByRole('navigation', { name: 'Capítulos do manual' });
  await chapters.getByRole('button', { name: /Pedido incompleto/ }).click();
  const help = page.locator('.manual-reading .call-safety-replies');
  await help.locator('summary').click();
  await help.getByRole('button', { name: 'Quero um reembolso.' }).click();
  await expect(help.locator('blockquote')).toContainText('Não consigo confirmar um reembolso');
  await expect(page.getByRole('heading', { level: 2, name: 'Pedido incompleto' })).toBeVisible();
});

test('manual mostra informações com fonte oficial e seus limites, sem dar validação aos guiões', async ({ page, isMobile }) => {
  await goToManual(page, 'Manual Coca-Cola', isMobile);
  const facts = page.getByRole('region', { name: 'Informação confirmada por fontes oficiais' });
  await expect(facts).toBeVisible();
  await expect(facts).toContainText('O que não comprova');
  await expect(facts.getByRole('link', { name: /Coca-Cola Portugal/ }).first()).toHaveAttribute('href', /coca-cola.com/);
  const chapters = page.getByRole('navigation', { name: 'Capítulos do manual' });
  await chapters.getByRole('button', { name: /Equipamento não refrigera/ }).click();
  const guide = page.getByRole('region', { name: 'Explicação detalhada deste assunto' });
  await expect(guide).toContainText('O que significa');
  await expect(guide).toContainText('O que verificar no sistema autorizado');
  await expect(guide.locator('li')).toHaveCount(3);
  await expect(guide).toContainText('Explicação editorial de apoio');
});

test('manual Burger King apresenta fontes do apoio e orientação diferenciada de reembolso', async ({ page, isMobile }) => {
  await goToManual(page, 'Manual Burger King', isMobile);
  const facts = page.getByRole('region', { name: 'Informação confirmada por fontes oficiais' });
  await expect(facts).toContainText('Categorias oficiais de suporte');
  await expect(facts).toContainText('Proteção de dados pessoais');
  await expect(facts).not.toContainText('Contacto público do consumidor');
  const chapters = page.getByRole('navigation', { name: 'Capítulos do manual' });
  await chapters.getByRole('button', { name: /Pedido incompleto/ }).click();
  await expect(page.getByRole('region', { name: 'Explicação detalhada deste assunto' })).toContainText('Não garantir reposição');
});
