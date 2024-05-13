// @ts-check
import { test, expect } from '@playwright/test'

test.use({ headless: true }) // Añade esta línea

const LOCALHOST_URL = 'http://localhost:5173/'

test('App get all pokemons', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const title = await page.getByRole('heading')

  const textContent = await title.textContent()

  await expect(textContent?.length).toBeGreaterThan(0)
})
/*
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/)
})

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible()
})
*/
