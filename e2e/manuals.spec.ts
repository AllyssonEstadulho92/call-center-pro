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
  await expect(page.getByText('Etapa 2 de', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Ler guião completo' }).click();
  await expect(page.locator('.manual-step')).toHaveCount(6);
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
