import { test, expect, type Page } from '@playwright/test';

const portraitWidths = [320, 360, 375, 390, 430];
const landscapeWidths = [844, 932, 980];

async function checkNoHorizontalOverflow(page: Page, label: string) {
  const info = await page.evaluate(() => {
    const width = window.innerWidth;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.topbar,.main-content,.home-welcome,.manual-page,.live-dashboard,.launcher-dialog'));
    return {
      width,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      offenders: nodes.filter(node => {
        const rect = node.getBoundingClientRect();
        return rect.width && (rect.left < -1 || rect.right > width + 1);
      }).map(el => ({ className: el.className, right: el.getBoundingClientRect().right })),
    };
  });
  expect(info.documentWidth, label + JSON.stringify(info)).toBeLessThanOrEqual(info.width + 1);
  expect(info.bodyWidth, label + JSON.stringify(info)).toBeLessThanOrEqual(info.width + 1);
  expect(info.offenders, label).toEqual([]);
}

test('viewport adaptado sem impedir zoom e com áreas de segurança no HTML', async ({ page }) => {
  await page.goto('/app.html');
  const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
  expect(viewport).toContain('width=device-width');
  expect(viewport).toContain('initial-scale=1.0');
  expect(viewport).toContain('viewport-fit=cover');
  expect(viewport).not.toMatch(/user-scalable\s*=\s*no|maximum-scale\s*=\s*1/);
  await page.setViewportSize({ width: 390, height: 844 });
  const computed = await page.evaluate(() => ({
    bottom: getComputedStyle(document.querySelector('.mobile-bottom-nav')!).paddingBottom,
    viewportHeight: getComputedStyle(document.querySelector('.app-shell')!).minHeight,
    envVariable: getComputedStyle(document.documentElement).getPropertyValue('--viewport-safe-bottom').trim(),
  }));
  // O browser resolve env(safe-area-inset-bottom) para 0px quando não há recorte.
  expect(parseFloat(computed.envVariable)).toBeGreaterThanOrEqual(0);
  expect(parseFloat(computed.bottom)).toBeGreaterThanOrEqual(8);
  expect(parseFloat(computed.viewportHeight)).toBeGreaterThan(0);
});

for (const width of portraitWidths) {
  test(`iPhone em retrato de ${width}px sem zoom automático ao focar pesquisa`, async ({ page }) => {
    await page.setViewportSize({ width, height: 780 });
    await page.goto('/app.html');
    await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Acesso rápido no telemóvel' })).toBeVisible();
    await checkNoHorizontalOverflow(page, 'Início');
    await page.locator('.home-extra-tools summary').click();
    await page.getByRole('navigation', { name: 'Ferramentas complementares' }).getByRole('button', { name: 'Pesquisa de assuntos' }).click();
    const search = page.getByRole('textbox', { name: 'Pesquisar por problema ou assunto' });
    await expect(search).toBeVisible();
    if (await page.evaluate(() => matchMedia('(pointer: coarse)').matches)) {
      await expect(search, 'Pesquisa por toque não deve abrir o teclado').not.toBeFocused();
    }
    const fontSize = await search.evaluate(el => parseFloat(getComputedStyle(el).fontSize));
    expect(fontSize, 'Pesquisa deve ter pelo menos 16px para evitar zoom do Safari').toBeGreaterThanOrEqual(16);
    await search.focus();
    await search.fill('frio');
    await expect(search).toHaveValue('frio');
    await checkNoHorizontalOverflow(page, 'Pesquisa com texto');
    await page.getByRole('button', { name: 'Abrir menu' }).click();
    await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('button', { name: /Manual Coca-Cola/ }).click();
    const input = page.getByRole('searchbox', { name: 'Pesquisar neste manual' });
    await expect(input).toBeVisible();
    expect(await input.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16);
    await checkNoHorizontalOverflow(page, 'Manual');
  });
}

for (const width of landscapeWidths) {
  test(`iPhone horizontal/tablet de ${width}px apresenta navegação móvel sem deslocação lateral`, async ({ page }) => {
    await page.setViewportSize({ width, height: 430 });
    await page.goto('/app.html');
    await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Acesso rápido no telemóvel' })).toBeVisible();
    await checkNoHorizontalOverflow(page, 'Horizontal');
    await page.getByRole('button', { name: 'Iniciar atendimento' }).first().click();
    const dialog = page.getByRole('dialog', { name: 'Iniciar atendimento' });
    await expect(dialog).toBeVisible();
    const input = dialog.getByRole('textbox', { name: 'Pesquisar situação de atendimento' });
    if (await page.evaluate(() => matchMedia('(pointer: coarse)').matches)) {
      await expect(input, 'Modal táctil não deve ativar o teclado').not.toBeFocused();
    }
    expect(await input.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16);
    await input.fill('frio');
    await expect(input).toHaveValue('frio');
    await checkNoHorizontalOverflow(page, 'Modal horizontal com texto');
  });
}

test('desktop de 1024px continua com a navegação lateral', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('/app.html');
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeHidden();
  await expect(page.getByRole('navigation', { name: 'Acesso rápido no telemóvel' })).toBeHidden();
  await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible();
  await checkNoHorizontalOverflow(page, 'Desktop');
});

test('tablet táctil largo não ativa automaticamente a pesquisa e mantém inputs legíveis', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Apenas dispositivos com emulação táctil.');
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('/app.html');
  await page.locator('.topbar .quick-search').click();
  const search = page.getByRole('textbox', { name: 'Pesquisar por problema ou assunto' });
  await expect(search).toBeVisible();
  await expect(search).not.toBeFocused();
  expect(await search.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16);
  await search.fill('aplicação');
  await expect(search).toHaveValue('aplicação');
  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('button', { name: /Manual Coca-Cola/ }).click();
  const manualSearch = page.getByRole('searchbox', { name: 'Pesquisar neste manual' });
  const category = page.locator('.manual-category-label select');
  expect(await manualSearch.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16);
  expect(await category.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16);
  await checkNoHorizontalOverflow(page, 'Tablet táctil');
});

test('desktop mantém foco rápido na pesquisa e atalho de teclado', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Apenas computador.');
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/app.html');
  await page.locator('.topbar .quick-search').click();
  const search = page.getByRole('textbox', { name: 'Pesquisar por problema ou assunto' });
  await expect(search).toBeFocused();
  await search.fill('frio');
  await expect(search).toHaveValue('frio');
  await page.keyboard.press('ControlOrMeta+k');
  await expect(search).toBeFocused();
});
