import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: { baseURL: "http://127.0.0.1:3100", trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: `"${process.platform === "win32" ? ".venv\\Scripts\\python.exe" : ".venv/bin/python"}" -m uvicorn tests.e2e_app:app --host 127.0.0.1 --port 8100`,
      cwd: "../backend", url: "http://127.0.0.1:8100/health", timeout: 60000,
    },
    {
      command: "npm run start", url: "http://127.0.0.1:3100/login",
      env: { BACKEND_URL: "http://127.0.0.1:8100", COOKIE_SECURE: "false", PORT: "3100" }, timeout: 120000,
    },
  ],
});
