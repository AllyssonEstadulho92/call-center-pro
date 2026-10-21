import { test, expect } from '@playwright/test';

test('dashboard: cartões e fontes com números reais, sem estatísticas fictícias', async ({ page }) => {
  await page.goto('/app.html');
  await expect(page.getByRole('heading', { name: 'Bem-vindo ao teu espaço de atendimento.' })).toBeVisible();
  await page.locator('.home-extra-tools summary').click();
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
  await page.locator('.home-extra-tools summary').click();
  const panel = page.locator('.home-resources-grid');
  await panel.getByRole('button', { name: /Ver manual/ }).first().click();
  await expect(page.getByRole('heading', { level: 1, name: 'Manual Coca-Cola' })).toBeVisible();
});

test('painel de atendimento só apresenta conclusão quando selecionada pelo operador', async ({ page }) => {
  await page.goto('/app.html');
  const live = page.getByRole('region', { name: 'Pré-visualização do atendimento em direto' });
  await live.getByRole('button', { name: 'Etapa 8: Confirmar resultado antes de encerrar' }).click();
  const status = live.getByRole('combobox', { name: 'Estado do registo no sistema' });
  await expect(status).toHaveValue('neutro');
  await status.selectOption('confirmado');
  await expect(live.locator('.live-dashboard-say blockquote')).toContainText('A ocorrência ficou registada');
  await live.getByRole('button', { name: 'Recomeçar guião' }).click();
  await live.getByRole('button', { name: 'Etapa 8: Confirmar resultado antes de encerrar' }).click();
  await expect(status).toHaveValue('neutro');
  await live.getByRole('button', { name: 'Burger King' }).click();
  await live.getByLabel('Assunto da chamada').selectOption('bk-telefone');
  await live.locator('.live-dashboard-steps button').last().click();
  await expect(status).toHaveValue('neutro');
  await status.selectOption('pendente');
  await expect(live.locator('.live-dashboard-say blockquote')).toContainText('Ainda não tenho confirmação');
});

test('respostas de contingência mudam de serviço e não prometem resultados', async ({ page }) => {
  await page.goto('/app.html');
  const panel = page.getByRole('region', { name: 'Pré-visualização do atendimento em direto' });
  const help = panel.locator('.call-safety-replies');
  await help.locator('summary').click();
  await expect(help.getByRole('button', { name: 'Quando vem o técnico?' })).toBeVisible();
  await help.getByRole('button', { name: 'Quando vem o técnico?' }).click();
  await expect(help.locator('blockquote')).toContainText('não tenho um prazo de assistência confirmado');
  await panel.getByRole('button', { name: 'Burger King' }).click();
  const bkHelp = panel.locator('.call-safety-replies');
  await bkHelp.locator('summary').click();
  await bkHelp.getByRole('button', { name: 'Quero um reembolso.' }).click();
  await expect(bkHelp.locator('blockquote')).toContainText('Não consigo confirmar um reembolso sem essa validação.');
});
