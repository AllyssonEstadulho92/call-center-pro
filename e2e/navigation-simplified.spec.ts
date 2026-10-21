import { test, expect } from '@playwright/test';

test('menu principal tem apenas os cinco acessos da imagem', async ({ page, isMobile }) => {
  await page.goto('/app.html');
  if (isMobile) await page.getByRole('button', { name: 'Abrir menu' }).click();
  const menu = page.getByRole('navigation', { name: 'Navegação principal' });
  await expect(menu.getByRole('button')).toHaveCount(5);
  for (const label of ['Início', 'Coca-Cola', 'Burger King', 'Manual Coca-Cola', 'Manual Burger King']) {
    await expect(menu.getByRole('button', { name: new RegExp(label) })).toHaveCount(1);
  }
  await expect(menu.getByRole('button', { name: 'Simulações de chamada' })).toHaveCount(0);
});
test('ferramentas secundárias continuam acessíveis através da página inicial', async ({ page }) => {
  await page.goto('/app.html');
  const tools = page.locator('.home-extra-tools');
  await expect(tools).not.toHaveAttribute('open', '');
  await tools.locator('summary').click();
  const nav = page.getByRole('navigation', { name: 'Ferramentas complementares' });
  await expect(nav.getByRole('button')).toHaveCount(9);
  await nav.getByRole('button', { name: 'Perguntas frequentes' }).click();
  await expect(page.getByRole('heading', { name: 'Respostas simples e responsáveis' })).toBeVisible();
});
test('cada PDF tem um link distinto na página inicial e no seu manual', async ({ page, isMobile }) => {
  await page.goto('/app.html');
  const links = page.locator('.home-download-links a');
  await expect(links).toHaveCount(2);
  await expect(links.nth(0)).toHaveAttribute('href', /\/manuais\/manual-coca-cola\.pdf$/);
  await expect(links.nth(1)).toHaveAttribute('href', /\/manuais\/manual-burger-king\.pdf$/);
  if (isMobile) {
    await page.getByRole('navigation', { name: 'Acesso rápido no telemóvel' }).getByRole('button', { name: 'Manual Coca-Cola' }).click();
  } else {
    await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('button', { name: /Manual Coca-Cola/ }).click();
  }
  await expect(page.locator('.manual-pdf-download a')).toHaveAttribute('href', /\/manuais\/manual-coca-cola\.pdf$/);
});
