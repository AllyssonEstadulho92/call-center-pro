import { test, expect } from '@playwright/test';

test('dashboard: cartões e fontes com números reais, sem estatísticas fictícias', async ({ page }) => {
  await page.goto('/app.html');
  await expect(page.getByRole('heading', { name: 'Bem-vindo ao teu espaço de atendimento.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Manuais, estudo e fontes' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Manual Coca-Cola' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Manual Burger King' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Fontes públicas' })).toBeVisible();
  await expect(page.getByText('guiões validados')).toBeVisible();
  await expect(page.getByText(/96%|28 atendimentos|4m 32s/i)).toHaveCount(0);
});

test('painel de atendimento alterna serviço e tema, sem perder etapas', async ({ page }) => {
  await page.goto('/app.html');
  const live = page.getByRole('region', { name: 'Pré-visualização do atendimento em direto' });
  await live.getByRole('button', { name: 'Burger King' }).click();
  await expect(live.getByLabel('Assunto da chamada')).toBeVisible();
  await live.getByLabel('Assunto da chamada').selectOption('bk-incompleto');
  await live.getByRole('button', { name: 'Avançar' }).click();
  await expect(live.getByText(/Etapa 2 de/)).toBeVisible();
  await live.getByRole('button', { name: 'Recomeçar guião' }).click();
  await expect(live.getByText(/Etapa 1 de/)).toBeVisible();
});

test('voz tem opções de velocidade e seleção do dispositivo sem gravação automática', async ({ page }) => {
  await page.goto('/app.html');
  const live = page.getByRole('region', { name: 'Pré-visualização do atendimento em direto' });
  await expect(live.getByRole('button', { name: 'Ouvir frase em voz portuguesa' })).toBeVisible();
  await expect(live.getByRole('combobox', { name: 'Selecionar voz portuguesa' })).toBeVisible();
  await expect(live.getByLabel('Velocidade')).toBeVisible();
  await expect(live.getByRole('button', { name: 'Pausar leitura da frase' })).toBeDisabled();
  await expect(live.getByText(/qualidade depende do sistema|vozes portuguesas instaladas/)).toBeVisible();
});

test('cartão manual abre a biblioteca correspondente', async ({ page }) => {
  await page.goto('/app.html');
  const panel = page.locator('.home-resources-grid');
  await panel.getByRole('button', { name: /Ver manual/ }).first().click();
  await expect(page.getByRole('heading', { level: 1, name: 'Manual Coca-Cola' })).toBeVisible();
});
