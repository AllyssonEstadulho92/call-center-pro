import { expect, test } from '@playwright/test';

test('auditoria mostra distinção de fonte pública e regra interna', async ({ page, isMobile }) => {
  await page.goto('/app.html');
  if (isMobile) await page.getByRole('button', { name: 'Abrir menu' }).click();
  await page.getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('button', { name: 'Segurança e fontes' }).click();
  await expect(page.getByRole('heading', { name: 'O que está confirmado e o que falta validar?' })).toBeVisible();
  const area = page.locator('.evidence-audit');
  await expect(area.getByText('guiões aprovados internamente')).toBeVisible();
  await expect(area.getByText('Prazos de assistência a equipamentos')).toBeVisible();
  await expect(area.getByText('Reembolsos e compensações Burger King')).toBeVisible();
  await expect(area.getByRole('link', { name: 'Coca-Cola Portugal' }).first()).toHaveAttribute('href', /coca-cola\.com/);
});

test('triagem digital não afirma limitação operacional não verificada', async ({ page, isMobile }) => {
  await page.goto('/app.html');
  if (isMobile) await page.getByRole('button', { name: 'Abrir menu' }).click();
  await page.getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('button', { name: 'Decidir encaminhamento' }).click();
  const controls = page.getByRole('region', { name: 'Identificação da situação' });
  await controls.getByRole('button', { name: 'Aplicação' }).click();
  await expect(page.getByText('Obrigado por confirmar o canal.', { exact: false })).toBeVisible();
  await expect(page.getByText('Nesta linha não consigo consultar diretamente')).toHaveCount(0);
});
