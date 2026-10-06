import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const orderHar = JSON.parse(readFileSync('tests/hars/order.har', 'utf-8'));
const orderBody = JSON.parse(orderHar.log.entries[0].response.content.text);
const ORDER_NUMBER = String(orderBody.order.number);

test.describe('добавление ингредиентов в конструктор', function () {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
    });
    await page.goto('/');
  });

  test('булка добавляется в конструктор', async ({ page }) => {
    const bunCard = page.locator('li', { hasText: 'Краторная булка N-200i' });
    await bunCard.getByRole('button', { name: 'Добавить' }).click();

    await expect(page.getByTestId('constructor-bun-1')).toContainText(
      'Краторная булка N-200i (верх)'
    );
    await expect(page.getByTestId('constructor-bun-2')).toContainText(
      'Краторная булка N-200i (низ)'
    );
  });

  test('добавление начинки в конструктор', async ({ page }) => {
    const mainCard = page.locator('li', {
      hasText: 'Филе Люминесцентного тетраодонтимформа',
    });
    await mainCard.getByRole('button', { name: 'Добавить' }).click();

    await expect(page.getByTestId('constructor-ingredients')).toContainText(
      'Филе Люминесцентного тетраодонтимформа'
    );
  });
});

test.describe('модальное окно ингредиента', function () {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
    });
    await page.goto('/');
  });

  test('открывается и показывает данные выбранного ингредиента', async ({ page }) => {
    const card = page.locator('li', { hasText: 'Краторная булка N-200i' });
    await card.getByRole('link').click();

    const modal = page.getByTestId('modal');

    await expect(
      modal.getByRole('heading', { name: 'Краторная булка N-200i' })
    ).toBeVisible();
    await expect(modal.locator('li', { hasText: 'Калории, ккал' })).toContainText('420');
  });
  test('закрывается по клику на крестик', async ({ page }) => {
    const card = page.locator('li', { hasText: 'Краторная булка N-200i' });
    await card.getByRole('link').click();

    const modal = page.getByTestId('modal');
    await expect(modal).toBeVisible();

    await modal.getByRole('button', { name: 'Закрыть' }).click();

    await expect(modal).toBeHidden();
  });

  test('закрывается по клику на оверлей', async ({ page }) => {
    const card = page.locator('li', { hasText: 'Краторная булка N-200i' });
    await card.getByRole('link').click();

    const modal = page.getByTestId('modal');
    await expect(modal).toBeVisible();

    await page.getByTestId('modal-overlay').click({ position: { x: 10, y: 10 } });

    await expect(modal).toBeHidden();
  });
});

test.describe('оформление заказа', function () {
  test.beforeEach(async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'accessToken',
        value: 'test-access-token',
        domain: 'localhost',
        path: '/',
      },
    ]);
    await page.addInitScript(() => {
      window.localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    await page.routeFromHAR('tests/hars/ingredients.har', { url: '**/api/ingredients' });
    await page.routeFromHAR('tests/hars/user.har', { url: '**/api/auth/user' });
    await page.routeFromHAR('tests/hars/order.har', { url: '**/api/orders' });

    await page.goto('/');
  });

  test('заказ оформляется, конструктор очищается', async ({ page }) => {
    const bunCard = page.locator('li', { hasText: 'Краторная булка N-200i' });
    await bunCard.getByRole('button', { name: 'Добавить' }).click();

    const mainCard = page.locator('li', {
      hasText: 'Филе Люминесцентного тетраодонтимформа',
    });
    await mainCard.getByRole('button', { name: 'Добавить' }).click();

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    await expect(page.getByTestId('order-number')).toHaveText(ORDER_NUMBER);

    await expect(page.getByTestId('constructor-bun-1')).toHaveCount(0);
    await expect(page.getByTestId('constructor-bun-2')).toHaveCount(0);
    await expect(page.getByTestId('constructor-ingredients')).toHaveText(
      'Выберите начинку'
    );

    await page.getByRole('button', { name: 'Закрыть' }).click();

    await expect(page.getByTestId('order-number')).toBeHidden();
  });
});
