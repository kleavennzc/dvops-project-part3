// Coverage Helper
import { test } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

const coverageDir = path.join(process.cwd(), 'coverage/temp');

test.beforeEach(async ({ page, browserName }) => {
  if (browserName === 'chromium') await page.coverage.startJSCoverage();
});

test.afterEach(async ({ page, browserName }, testInfo) => {
  if (browserName === 'chromium') {
    const coverage = await page.coverage.stopJSCoverage();
    try { await fs.access(coverageDir); } catch { await fs.mkdir(coverageDir, { recursive: true }); }
    const filePath = path.join(coverageDir, `v8-coverage-${testInfo.title.replace(/[\W_]+/g, '-')}.json`);
    await fs.writeFile(filePath, JSON.stringify(coverage));
  }
});