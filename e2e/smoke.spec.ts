import { test, expect } from '@playwright/test';

test('página inicial abre sem erros e mostra os dois serviços', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/app.html');
  await expect(page.getByRole('heading', { name: /Bom atendimento começa/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Coca-Cola.*Serviços de Avarias/ }).last()).toBeVisible();
  await expect(page.getByRole('button', { name: /Burger King.*Apoio ao Cliente/ }).last()).toBeVisible();
  await expect(page.getByRole('region', { name: 'Pré-visualização do atendimento em direto' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('iniciar atendimento abre seleção pesquisável e permite avançar', async ({ page }) => {
  await page.goto('/app.html');
  await page.getByRole('button', { name: /Iniciar atendimento/ }).first().click();
  const dialog = page.getByRole('dialog', { name: 'Iniciar atendimento' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('textbox', { name: 'Pesquisar situação de atendimento' }).fill('não faz frio');
  await expect(dialog.getByRole('button', { name: /Equipamento não refrigera/ })).toBeVisible();
  await dialog.getByRole('button', { name: /Equipamento não refrigera/ }).click();
  await expect(page.getByRole('heading', { name: 'Equipamento não refrigera' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ouvir frase em voz portuguesa' })).toBeVisible();
  await page.getByRole('button', { name: /Próxima etapa/ }).click();
  await expect(page.getByText('ETAPA 2 DE')).toBeVisible();
});

test('simulações têm avisos de privacidade e respostas de referência', async ({ page, isMobile }) => {
  await page.goto('/app.html');
  if (isMobile) {
    await page.getByRole('button', { name: 'Abrir menu' }).click();
  }
  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('button', { name: 'Simulações de chamada' }).click();
  await expect(page.getByRole('heading', { name: 'Treina uma chamada, com calma' })).toBeVisible();
  await expect(page.getByText(/nunca uma chamada, a voz do cliente/i)).toBeVisible();
  await page.getByRole('button', { name: /Ver resposta de referência/ }).click();
  await expect(page.getByText('Exemplo por confirmar', { exact: false })).toBeVisible();
});
