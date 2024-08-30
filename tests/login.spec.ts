import { test, expect } from '@playwright/test';

test('bem-sucedido', async ({ page }) => {
    await page.goto('https://store.steampowered.com/login/');
    await page.locator('#responsive_page_template_content input[type="text"]').fill('coloca_teu_nome_aqui');
    await page.locator('#responsive_page_template_content input[type="text"]').press('Tab');
    await page.locator('input[type="password"]').fill('coloca_tua_senha_aqui');
    await page.locator('input[type="password"]').press('Enter');
    await expect(page.getByText('Use the Steam Mobile App to')).toBeVisible();
});

test('campos-vazios', async ({ page }) => {
    await page.goto('https://store.steampowered.com/login/');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('https://store.steampowered.com/login/');
});

test('senha-incorreta', async ({ page }) => {
    await page.goto('https://store.steampowered.com/login/');
    await page.locator('#responsive_page_template_content input[type="text"]').fill('coloca_teu_nome_aqui');
    await page.locator('#responsive_page_template_content input[type="text"]').press('Tab');
    await page.locator('input[type="password"]').fill('batata');
    await page.locator('input[type="password"]').press('Enter');
    await expect(page.getByText('Please check your password')).toBeVisible();
});

test('captcha-esqueceu-senha', async ({ page }) => {
    await page.goto('https://store.steampowered.com/login/');
    await page.getByRole('link', { name: 'Help, I can\'t sign in' }).click();
    await page.getByRole('link', { name: 'I forgot my Steam Account' }).click();
    await page.locator('#forgot_login_search').click();
    await page.locator('#forgot_login_search').fill('teste@gmail.com');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('Your response to the CAPTCHA').isVisible()).resolves.toBeTruthy();
});

test('maiusculo-minusculo', async ({ page }) => {
    await page.goto('https://store.steampowered.com/login/');
    await page.locator('#responsive_page_template_content input[type="text"]').fill('coloca_nome_com_maiusculo_minusculo');
    await page.locator('#responsive_page_template_content input[type="text"]').press('Tab');
    await page.locator('input[type="password"]').fill('coloca_senha_com_maiusculo_minusculo');
    await page.locator('input[type="password"]').press('Enter');
    await expect(page.getByText('Please check your password')).toBeVisible();
});
