import { test, expect, type Page } from '@playwright/test';

/**
 * Regressões de escala e overflow observadas em browsers de telemóvel.
 * Não ocultar conteúdo com overflow-x:hidden nem desativar pinch-to-zoom:
 * a página deve caber naturalmente no viewport.
 */
async function expectFitsViewport(page: Page, width: number, context: string) {
  const measurement = await page.evaluate(() => {
    const viewport = window.innerWidth;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.topbar, .main-area, .main-content, .dashboard-hero-layout, .manual-page, .workflow, .live-dashboard'));
    return {
      viewport,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      overflowElements: elements.filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && (r.left < -1 || r.right > viewport + 1);
      }).map(el => ({ selector: el.className, width: Math.round(el.getBoundingClientRect().width), right: Math.round(el.getBoundingClientRect().right) })),
    };
  });
  expect(measurement.viewport, context).toBe(width);
  expect(measurement.scrollWidth, `${context}: excesso horizontal na página: ${JSON.stringify(measurement)}`).toBeLessThanOrEqual(width + 1);
  expect(measurement.bodyScrollWidth, `${context}: excesso horizontal no body: ${JSON.stringify(measurement)}`).toBeLessThanOrEqual(width + 1);
  expect(measurement.overflowElements, `${context}: conteúdo fora do ecrã`).toEqual([]);
}

for (const width of [320, 360, 375, 390, 430, 768]) {
  test(`ecrã com ${width}px: apresentação sem zoom ou deslocação horizontal`, async ({ page }) => {
    await page.setViewportSize({ width, height: 810 });
    await page.goto('/app.html');
    await expect(page.getByRole('heading', { name: /Bem-vindo ao teu espaço de atendimento/ })).toBeVisible();
    await expectFitsViewport(page, width, 'Visão geral');
    const topSearch = page.locator('.topbar .quick-search');
    const searchBox = await topSearch.boundingBox();
    expect(searchBox).not.toBeNull();
    expect(searchBox!.width, 'Pesquisa na barra superior deve ser compacta no telemóvel').toBeLessThanOrEqual(46);
    if (width <= 480) {
      const serviceCard = page.locator('.project-hero').first();
      const cardBox = await serviceCard.boundingBox();
      expect(cardBox).not.toBeNull();
      expect(cardBox!.height, 'Cartão compacto no smartphone').toBeLessThanOrEqual(195);
    }
    await page.getByRole('button', { name: 'Abrir menu' }).click();
    await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('button', { name: /Manual Coca-Cola/ }).click();
    await expect(page.getByRole('heading', { level: 1, name: 'Manual Coca-Cola' })).toBeVisible();
    await expectFitsViewport(page, width, 'Manual Coca-Cola');
    await page.getByRole('button', { name: 'Abrir menu' }).click();
    await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('button', { name: /Simulações de chamada/ }).click();
    await expect(page.getByRole('heading', { name: 'Treina uma chamada, com calma' })).toBeVisible();
    await expectFitsViewport(page, width, 'Simulações');
  });
}

test('menus e ações acessíveis em ecrã estreito de 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 690 });
  await page.goto('/app.html');
  await expect(page.getByRole('navigation', { name: 'Acesso rápido no telemóvel' })).toBeVisible();
  const header = page.locator('.topbar');
  const headerBox = await header.boundingBox();
  expect(headerBox).not.toBeNull();
  expect(headerBox!.width).toBeLessThanOrEqual(320);
  await page.getByRole('button', { name: 'Iniciar atendimento' }).first().click();
  await expect(page.getByRole('dialog', { name: 'Iniciar atendimento' })).toBeVisible();
  await page.getByRole('button', { name: 'Fechar' }).click();
  await page.getByRole('navigation', { name: 'Acesso rápido no telemóvel' }).getByRole('button', { name: 'Pesquisa' }).click();
  await expect(page.getByRole('heading', { name: /De que precisas para esta chamada/ })).toBeVisible();
  await expectFitsViewport(page, 320, 'Pesquisa');
});

test('o zoom do utilizador não é desativado pelo viewport', async ({ page }) => {
  await page.goto('/app.html');
  const meta = await page.locator('meta[name="viewport"]').getAttribute('content');
  expect(meta).toContain('width=device-width');
  expect(meta).not.toMatch(/user-scalable\s*=\s*no|maximum-scale\s*=\s*1/);
});
