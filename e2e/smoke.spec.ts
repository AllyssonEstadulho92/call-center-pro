import { test, expect } from '@playwright/test';

test('página inicial abre sem erros e mostra os dois serviços', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/app.html');
  await expect(page.getByRole('heading', { name: /Bem-vindo ao teu espaço de atendimento/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /serviços de avarias/i }).last()).toBeVisible();
  await expect(page.getByRole('button', { name: /apoio ao cliente/i }).last()).toBeVisible();
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

test('simulações têm avisos de privacidade e respostas de referência', async ({ page }) => {
  await page.goto('/app.html');
  await page.locator('.home-extra-tools summary').click();
  await page.getByRole('navigation', { name: 'Ferramentas complementares' }).getByRole('button', { name: 'Simulações de chamada' }).click();
  await expect(page.getByRole('heading', { name: 'Treina uma chamada, com calma' })).toBeVisible();
  await expect(page.getByText(/nunca uma chamada, a voz do cliente/i)).toBeVisible();
  await page.getByRole('button', { name: /Ver resposta de referência/ }).click();
  await expect(page.getByText('Exemplo por confirmar', { exact: false })).toBeVisible();
});

test('teleponto não apresenta consulta como validação de registo', async ({ page }) => {
  await page.goto('/app.html');
  await page.getByRole('button', { name: /Iniciar atendimento/ }).first().click();
  const dialog = page.getByRole('dialog', { name: 'Iniciar atendimento' });
  await dialog.getByRole('textbox', { name: 'Pesquisar situação de atendimento' }).fill('não faz frio');
  await dialog.getByRole('button', { name: /Equipamento não refrigera/ }).click();
  await expect(page.getByText('Etapa consultada')).toBeVisible();
  await expect(page.getByText('0% consultado')).toBeVisible();
  await page.getByRole('checkbox', { name: 'Etapa consultada' }).check();
  await expect(page.getByText(/% consultado/)).toBeVisible();
  await page.getByRole('button', { name: /Confirmar resultado antes de encerrar/ }).click();
  await expect(page.locator('.notes-panel')).toContainText('Se continuar pendente');
});

test('teleponto não declara registo confirmado por defeito e limpa o estado ao recomeçar', async ({ page }) => {
  await page.goto('/app.html');
  await page.getByRole('button', { name: /Iniciar atendimento/ }).first().click();
  const dialog = page.getByRole('dialog', { name: 'Iniciar atendimento' });
  await dialog.getByRole('textbox', { name: 'Pesquisar situação de atendimento' }).fill('não faz frio');
  await dialog.getByRole('button', { name: /Equipamento não refrigera/ }).click();
  await page.getByRole('button', { name: /Confirmar resultado antes de encerrar/ }).click();
  const status = page.getByRole('combobox', { name: 'Estado do registo no sistema' });
  await expect(status).toHaveValue('neutro');
  await expect(page.locator('.script-text')).toContainText('Vou verificar no sistema o estado do registo');
  await status.selectOption('confirmado');
  await expect(page.locator('.script-text')).toContainText('A ocorrência ficou registada no sistema.');
  await status.selectOption('pendente');
  await expect(page.locator('.script-text')).toContainText('ainda não tenho confirmação');
  await page.getByRole('button', { name: 'Recomeçar' }).click();
  await page.getByRole('button', { name: /Confirmar resultado antes de encerrar/ }).click();
  await expect(status).toHaveValue('neutro');
});

test('teleponto não trata contactos de consumidor como registos de avaria', async ({ page }) => {
  await page.goto('/app.html');
  await page.getByRole('button', { name: /Iniciar atendimento/ }).first().click();
  const dialog = page.getByRole('dialog', { name: 'Iniciar atendimento' });
  await dialog.getByRole('textbox', { name: 'Pesquisar situação de atendimento' }).fill('consumidor');
  await dialog.getByRole('button', { name: /Questões do consumidor/ }).click();
  await page.getByRole('button', { name: /Encerramento sem assumir registo/ }).click();
  await expect(page.locator('.script-text')).toContainText('procedimento aplicável a este assunto');
  await expect(page.getByRole('combobox', { name: 'Estado do registo no sistema' })).toHaveCount(0);
});
