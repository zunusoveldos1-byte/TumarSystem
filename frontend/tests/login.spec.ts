import { test, expect } from "@playwright/test";

test("validation, password visibility and remember preference", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Вход в систему", exact: true })).toBeVisible();
  await page.getByLabel("Логин", { exact: true }).fill("");
  await page.getByLabel("Пароль", { exact: true }).fill("");
  await page.getByRole("button", { name: "Войти", exact: true }).click();
  await expect(page.locator("#username-error")).toBeVisible();
  await expect(page.locator("#password-error")).toBeVisible();
  await page.getByLabel("Пароль", { exact: true }).fill("secret");
  await page.getByRole("button", { name: "Показать пароль" }).click();
  await expect(page.getByLabel("Пароль", { exact: true })).toHaveAttribute("type", "text");
  await page.getByRole("button", { name: "Скрыть пароль" }).click();
  await expect(page.getByLabel("Пароль", { exact: true })).toHaveAttribute("type", "password");
  await expect(page.getByRole("checkbox")).toBeChecked();
  await page.getByRole("checkbox").uncheck();
  await expect(page.getByRole("checkbox")).not.toBeChecked();
});

test("shows loading and credential error, allows retry", async ({ page }) => {
  let release!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/api/v1/auth/login", async route => {
    await pending;
    await route.fulfill({ status: 401, contentType: "application/json", body: JSON.stringify({ message: "Неверный логин или пароль" }) });
  });
  await page.goto("/login");
  await page.getByLabel("Логин", { exact: true }).fill("manager");
  await page.getByLabel("Пароль", { exact: true }).fill("wrong");
  await page.getByRole("button", { name: "Войти", exact: true }).click();
  await expect(page.getByRole("button", { name: "Входим…" })).toBeDisabled();
  release();
  await expect(page.getByRole("alert").filter({ hasText: "Неверный логин или пароль" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Войти", exact: true })).toBeEnabled();
});

test("protected page redirects and mobile form fits", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login$/);
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.getByRole("button", { name: "Войти", exact: true })).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("proxy rejects malformed and cross-origin requests", async ({ request }) => {
  const invalid = await request.post("/api/v1/auth/login", { data: { username: "", password: "" } });
  expect(invalid.status()).toBe(422);
  const crossOrigin = await request.post("/api/v1/auth/login", {
    headers: { Origin: "https://untrusted.example" }, data: { username: "manager", password: "secret" },
  });
  expect(crossOrigin.status()).toBe(403);
});

for (const remember of [true, false]) {
  test(`real API login, cookie and logout (remember=${remember})`, async ({ page, context }) => {
    await page.goto("/login");
    await page.getByLabel("Логин", { exact: true }).fill("manager@example.com");
    await page.getByLabel("Пароль", { exact: true }).fill("E2eTestPassword!");
    await page.getByRole("checkbox").setChecked(remember);
    const responsePromise = page.waitForResponse("**/api/v1/auth/login");
    await page.getByRole("button", { name: "Войти", exact: true }).click();
    const response = await responsePromise;
    expect(response.status()).toBe(200);
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByRole("heading", { name: "Добро пожаловать, manager" })).toBeVisible();
    const session = (await context.cookies()).find(cookie => cookie.name === "tumar_session");
    expect(session?.httpOnly).toBe(true);
    expect(session?.sameSite).toBe("Lax");
    expect(session?.expires === -1).toBe(!remember);
    await page.reload();
    await expect(page.getByText("manager@example.com", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Выйти" }).click();
    await expect(page).toHaveURL(/\/login$/);
    expect((await context.cookies()).find(cookie => cookie.name === "tumar_session")).toBeUndefined();
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login$/);
  });
}
